import assert from "node:assert/strict";
import test from "node:test";
import {
  buildUserByUsernameUrl,
  buildUserTweetsUrl,
  formatJapaneseDate,
  mapTweetsToCards,
  readUserId,
  safeImageUrl,
} from "./map-posts.ts";

test("tweets URL asks for original posts and the fields we render", () => {
  const url = new URL(buildUserTweetsUrl("12345"));
  assert.equal(url.origin + url.pathname, "https://api.x.com/2/users/12345/tweets");
  assert.equal(url.searchParams.get("max_results"), "10");
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

test("maps the newest four posts, photos, video previews, and plain text", () => {
  const cards = mapTweetsToCards({
    data: [
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
  });

  assert.deepEqual(cards.map((card) => card.id), ["14", "13", "12", "11"]);
  assert.equal(cards[0]?.image?.url, "https://pbs.twimg.com/media/thumb.jpg");
  assert.equal(cards[0]?.text, "動画です");
  assert.equal(cards[1]?.image?.url, "https://pbs.twimg.com/media/photo.jpg");
  assert.equal(cards[1]?.text, "写真です 詳細は solutioncoop-jp.com");
  assert.equal(cards[2]?.text, "文章のみ #堺市");
  assert.equal(cards[2]?.href, "https://x.com/KumiaiSol/status/12");
  assert.equal(cards[2]?.dateLabel, "2026年11月07日");
  assert.equal(cards[3]?.image, null);
});

test("bad payloads become an empty list", () => {
  assert.deepEqual(mapTweetsToCards(null), []);
  assert.deepEqual(mapTweetsToCards({ data: "nope" }), []);
});
