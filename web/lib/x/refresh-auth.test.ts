import assert from "node:assert/strict";
import test from "node:test";
import { refreshAuthDecision } from "./refresh-auth.ts";

test("missing refresh secret is 404 and does not accept any key", () => {
  assert.equal(refreshAuthDecision(undefined, "anything"), 404);
  assert.equal(refreshAuthDecision("   ", "anything"), 404);
  assert.equal(refreshAuthDecision(undefined, null), 404);
});

test("wrong key is 401", () => {
  assert.equal(refreshAuthDecision("local-dummy", "nope"), 401);
  assert.equal(refreshAuthDecision("local-dummy", null), 401);
  assert.equal(refreshAuthDecision("local-dummy", "local-dummy-extra"), 401);
  assert.equal(refreshAuthDecision("local-dummy", ""), 401);
});

test("right key is 200", () => {
  assert.equal(refreshAuthDecision("local-dummy", "local-dummy"), 200);
  assert.equal(refreshAuthDecision("  local-dummy  ", "local-dummy"), 200);
});
