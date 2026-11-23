import assert from "node:assert/strict";
import test from "node:test";
import {
  X_ACCOUNT_USER_ID,
  buildUserByUsernameUrl,
  buildUserTweetsUrl,
  fetchUserTweets,
  formatJapaneseDate,
  mapTweetsToCards,
  readUserId,
  safeImageUrl,
} from "./map-posts.ts";

test("tweets URL asks for original posts and the fields we render", () => {
  const url = new URL(buildUserTweetsUrl("12345"));
  assert.equal(url.origin + url.pathname, "https://api.x.com/2/users/12345/tweets");
  assert.equal(url.searchParams.get("max_results"), "20");
  assert.equal(url.searchParams.get("exclude"), "replies,retweets");
  assert.equal(url.searchParams.get("tweet.fields"), "created_at,text,attachments,entities");
  assert.equal(url.searchParams.get("expansions"), "attachments.media_keys");
  assert.equal(url.searchParams.get("media.fields"), "url,preview_image_url,width,height,type");
  assert.equal(buildUserByUsernameUrl("KumiaiSol"), "https://api.x.com/2/users/by/username/KumiaiSol");
});

test("user id is a digit string only", () => {
  assert.equal(readUserId({ data: { id: "2119698642160476160" } }), "2119698642160476160");
  assert.equal(readUserId({ data: { id: "nope" } }), null);
  assert.equal(readUserId({}), null);
});

test("image URLs stay on pbs.twimg.com or a local fixture path", () => {
  assert.equal(safeImageUrl("https://pbs.twimg.com/media/abc.jpg"), "https://pbs.twimg.com/media/abc.jpg");
  assert.equal(safeImageUrl("https://evil.example/a.jpg"), null);
  assert.equal(safeImageUrl("javascript:alert(1)"), null);
  assert.equal(safeImageUrl("/images/office-exterior.webp"), "/images/office-exterior.webp");
  assert.equal(safeImageUrl("/images/../secret"), null);
});

test("dates use the Japan calendar day", () => {
  assert.equal(formatJapaneseDate("2026-11-08T15:00:00.000Z"), "2026年11月09日");
  assert.equal(formatJapaneseDate("2026-11-08T14:59:00.000Z"), "2026年11月08日");
  assert.equal(formatJapaneseDate("not-a-date"), "");
});

test("maps the newest six posts, photos, video previews, and plain text", () => {
  const cards = mapTweetsToCards({
    data: [
      {
        id: "15",
        text: "いちばん新しい投稿",
        created_at: "2026-11-10T01:00:00.000Z",
      },
      {
        id: "9",
        text: "表示されない古い投稿",
        created_at: "2026-09-01T00:00:00.000Z",
      },
      {
        id: "10",
        text: "古い投稿",
        created_at: "2026-10-01T00:00:00.000Z",
      },
      {
        id: "14",
        text: "動画です https://t.co/video00",
        created_at: "2026-11-09T01:00:00.000Z",
        attachments: { media_keys: ["7_video"] },
        entities: {
          urls: [{ url: "https://t.co/video00", expanded_url: "https://x.com/KumiaiSol/status/14/video/1", display_url: "x.com/video" }],
        },
      },
      {
        id: "13",
        text: "写真です https://t.co/photo00 詳細は https://t.co/site00",
        created_at: "2026-11-08T01:00:00.000Z",
        attachments: { media_keys: ["3_photo"] },
        entities: {
          urls: [
            { url: "https://t.co/photo00", expanded_url: "https://x.com/KumiaiSol/status/13/photo/1", display_url: "pic.x.com/photo" },
            { url: "https://t.co/site00", expanded_url: "https://solutioncoop-jp.com/", display_url: "solutioncoop-jp.com" },
          ],
        },
      },
      {
        id: "12",
        text: "文章のみ #堺市",
        created_at: "2026-11-07T01:00:00.000Z",
      },
      {
        id: "11",
        text: "外部画像は出しません",
        created_at: "2026-11-06T01:00:00.000Z",
        attachments: { media_keys: ["3_evil"] },
      },
      { id: "bad", text: "idが不正", created_at: "2026-11-10T00:00:00.000Z" },
    ],
    includes: {
      media: [
        { media_key: "3_photo", type: "photo", url: "https://pbs.twimg.com/media/photo.jpg" },
        { media_key: "7_video", type: "video", preview_image_url: "https://pbs.twimg.com/media/thumb.jpg" },
        { media_key: "3_evil", type: "photo", url: "https://evil.example/a.jpg" },
      ],
    },
  }, "KumiaiSol", 6);

  assert.deepEqual(cards.map((card) => card.id), ["15", "14", "13", "12", "11", "10"]);
  assert.equal(cards[1]?.image?.url, "https://pbs.twimg.com/media/thumb.jpg?name=small");
  assert.equal(cards[1]?.text, "動画です");
  assert.equal(cards[2]?.image?.url, "https://pbs.twimg.com/media/photo.jpg?name=small");
  assert.equal(cards[2]?.text, "写真です 詳細は solutioncoop-jp.com");
  assert.equal(cards[3]?.text, "文章のみ #堺市");
  assert.equal(cards[3]?.href, "https://x.com/KumiaiSol/status/12");
  assert.equal(cards[3]?.dateLabel, "2026年11月07日");
  assert.equal(cards[4]?.image, null);
});

test("bad payloads become an empty list", () => {
  assert.deepEqual(mapTweetsToCards(null), []);
  assert.deepEqual(mapTweetsToCards({ data: "nope" }), []);
});

const mockedTimeline = {
  data: [
    {
      id: "2125000000000000001",
      text: "新しい写真 #新しいプロフィール画像 https://t.co/profile00",
      created_at: "2026-11-23T16:00:00.000Z",
      attachments: { media_keys: ["3_profile"] },
      entities: {
        urls: [{ url: "https://t.co/profile00", expanded_url: "https://x.com/KumiaiSol/photo", display_url: "pic.x.com/profile" }],
      },
    },
    {
      id: "2124883354223005730",
      text: "入国後講習を終えた実習生が、受け入れ企業さまでの勤務初日を迎えました。 https://t.co/photo00",
      created_at: "2026-11-23T15:10:44.000Z",
      attachments: { media_keys: ["3_newest"] },
      entities: {
        urls: [{ url: "https://t.co/photo00", expanded_url: "https://x.com/KumiaiSol/status/2124883354223005730/photo/1", display_url: "pic.x.com/photo" }],
      },
    },
    {
      id: "2117033843530289581",
      text: "ソリューション協同組合(大阪府堺市)の公式アカウントを開設しました。どうぞよろしくお願いいたします。",
      created_at: "2026-11-01T23:19:35.000Z",
    },
  ],
  includes: {
    media: [
      { media_key: "3_profile", type: "photo", url: "https://pbs.twimg.com/media/profile.jpg" },
      { media_key: "3_newest", type: "photo", url: "https://pbs.twimg.com/media/HX0aJdzb0AAooP6.jpg" },
    ],
  },
};

test("mocked v2 timeline keeps the newest real post and text-only posts", () => {
  const cards = mapTweetsToCards(mockedTimeline, "KumiaiSol", 12);
  assert.equal(cards[0]?.id, "2124883354223005730");
  assert.equal(cards[0]?.image?.url, "https://pbs.twimg.com/media/HX0aJdzb0AAooP6.jpg?name=small");
  assert.equal(cards[0]?.href, "https://x.com/KumiaiSol/status/2124883354223005730");
  assert.equal(cards.some((card) => card.text.includes("#新しいプロフィール画像")), false);
  const textOnly = cards.find((card) => card.id === "2117033843530289581");
  assert.ok(textOnly);
  assert.equal(textOnly?.image, null);
  assert.equal(textOnly?.text.includes("公式アカウントを開設しました"), true);
});

test("timeline request uses @KumiaiSol's user id and does not log the token", async () => {
  const token = "test-token-not-real";
  const logs: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
  };
  let requested = "";
  let auth = "";
  try {
    await fetchUserTweets(X_ACCOUNT_USER_ID, token, (async (input, init) => {
      requested = String(input);
      auth = new Headers(init?.headers).get("authorization") ?? "";
      return new Response(JSON.stringify(mockedTimeline), { status: 200, headers: { "content-type": "application/json" } });
    }) as typeof fetch);
  } finally {
    console.error = original;
  }
  assert.equal(new URL(requested).pathname, `/2/users/${X_ACCOUNT_USER_ID}/tweets`);
  assert.equal(auth, `Bearer ${token}`);
  assert.equal(logs.some((line) => line.includes(token)), false);
  const cards = mapTweetsToCards(mockedTimeline);
  assert.equal(cards[0]?.id, "2124883354223005730");
});
