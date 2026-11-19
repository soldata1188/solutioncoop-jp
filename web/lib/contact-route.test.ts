import assert from "node:assert/strict";
import test from "node:test";
import { CONTACT_PREPARING_MESSAGE, CONTACT_TO_DEFAULT, contactMailConfig } from "./contact.ts";
import { submitContact } from "./contact-submit.ts";

const ENV_KEYS = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL", "SHEETS_WEBHOOK_URL", "SHEETS_WEBHOOK_SECRET"] as const;

function saveEnv() {
  return Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
}

function restoreEnv(saved: Record<string, string | undefined>) {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
}

function clearContactEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

const valid = {
  company: "テスト株式会社",
  name: "山田太郎",
  phone: "0722248067",
  email: "customer@example.com",
  message: "受入れの相談です",
  agree: "yes",
};

function post(body: Record<string, unknown>) {
  return submitContact(body);
}

test("mail is preparing unless both Resend values are set", () => {
  assert.equal(contactMailConfig({}).preparing, true);
  assert.equal(contactMailConfig({}).to, CONTACT_TO_DEFAULT);
  assert.equal(contactMailConfig({ RESEND_API_KEY: "re_test" }).preparing, true);
  assert.equal(contactMailConfig({ CONTACT_FROM_EMAIL: "no-reply@solutioncoop-jp.com" }).preparing, true);
  assert.equal(contactMailConfig({ RESEND_API_KEY: "  ", CONTACT_FROM_EMAIL: "  " }).preparing, true);
  assert.equal(
    contactMailConfig({ RESEND_API_KEY: "re_test", CONTACT_FROM_EMAIL: "no-reply@solutioncoop-jp.com" }).preparing,
    false,
  );
  assert.equal(contactMailConfig({ SHEETS_WEBHOOK_URL: "https://script.example/webhook" }).preparing, false);
  assert.equal(contactMailConfig({ CONTACT_TO_EMAIL: "" }).to, CONTACT_TO_DEFAULT);
  assert.equal(contactMailConfig({ CONTACT_TO_EMAIL: " boss@example.com " }).to, "boss@example.com");
});

test("missing mail settings return the preparing message and do not call the network", async () => {
  const saved = saveEnv();
  const originalFetch = globalThis.fetch;
  let called = 0;
  globalThis.fetch = (async () => {
    called += 1;
    throw new Error("network must not be called");
  }) as typeof fetch;
  try {
    clearContactEnv();
    const res = await post(valid);
    const json = await res.json();
    assert.equal(res.status, 503);
    assert.equal(json.status, "not_configured");
    assert.equal(json.message, CONTACT_PREPARING_MESSAGE);
    assert.equal(called, 0);

    process.env.RESEND_API_KEY = "re_test";
    const missingFrom = await post(valid);
    assert.equal(missingFrom.status, 503);
    assert.equal((await missingFrom.json()).message, CONTACT_PREPARING_MESSAGE);

    delete process.env.RESEND_API_KEY;
    process.env.CONTACT_FROM_EMAIL = "no-reply@solutioncoop-jp.com";
    const missingKey = await post(valid);
    assert.equal(missingKey.status, 503);
    assert.equal(called, 0);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnv(saved);
  }
});

test("a configured send uses the default recipient and the customer's reply-to", async () => {
  const saved = saveEnv();
  const originalFetch = globalThis.fetch;
  const calls: { url: string; body: Record<string, unknown>; authorization: string }[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({
      url: String(input),
      body: JSON.parse(String(init?.body)),
      authorization: String((init?.headers as Record<string, string>)?.Authorization ?? ""),
    });
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    clearContactEnv();
    process.env.RESEND_API_KEY = "re_test_dummy";
    process.env.CONTACT_FROM_EMAIL = "ソリューション協同組合 <no-reply@solutioncoop-jp.com>";
    const res = await post(valid);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).status, "sent");
    assert.equal(calls.length, 1);
    assert.equal(calls[0]?.url, "https://api.resend.com/emails");
    assert.equal(calls[0]?.authorization, "Bearer re_test_dummy");
    assert.deepEqual(calls[0]?.body.to, ["info@solutioncoop-jp.com"]);
    assert.equal(calls[0]?.body.reply_to, "customer@example.com");
    assert.equal(calls[0]?.body.from, "ソリューション協同組合 <no-reply@solutioncoop-jp.com>");

    calls.length = 0;
    process.env.CONTACT_TO_EMAIL = "desk@example.com";
    await post({ ...valid, email: "other@example.com" });
    assert.deepEqual(calls[0]?.body.to, ["desk@example.com"]);
    assert.equal(calls[0]?.body.reply_to, "other@example.com");
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnv(saved);
  }
});

test("invalid email and the honeypot do not send", async () => {
  const saved = saveEnv();
  const originalFetch = globalThis.fetch;
  let called = 0;
  globalThis.fetch = (async () => {
    called += 1;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    clearContactEnv();
    process.env.RESEND_API_KEY = "re_test_dummy";
    process.env.CONTACT_FROM_EMAIL = "no-reply@solutioncoop-jp.com";
    const invalid = await post({ ...valid, email: "not-an-email" });
    assert.equal(invalid.status, 422);
    const honeypot = await post({ ...valid, website: "https://spam.example" });
    assert.equal(honeypot.status, 200);
    assert.equal((await honeypot.json()).status, "sent");
    assert.equal(called, 0);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnv(saved);
  }
});

test("a sheets webhook stays optional and is not required for preparing", async () => {
  const saved = saveEnv();
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    urls.push(String(input));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    clearContactEnv();
    process.env.SHEETS_WEBHOOK_URL = "https://script.example/webhook";
    const res = await post(valid);
    assert.equal(res.status, 200);
    assert.deepEqual(urls, ["https://script.example/webhook"]);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnv(saved);
  }
});
