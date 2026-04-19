// ============================================================
//  AI CLIENT — Calls Google Gemini AI directly from the browser
//  (Browser IP → Google AI) to bypass VPS regional restrictions
//  ブラウザから直接 Google AI を呼び出すクライアント
// ============================================================

const STYLE_INSTRUCTIONS: Record<string, string> = {
  policy: `
    [STYLE A — 政策・法改正ニュース]
    - 重点: 実施時期、新制度（育成就労制度）の具体的な変更点、法的リスクと数字。
    - 構成: 現在の状況 → 重要な変更点 → 企業への影響 → 推奨されるアクション。
    - トーン: 正確、明快、豊富なデータ。違反時の罰則や期限を強調する。
  `,
  casestudy: `
    [STYLE B — 導入事例・ストーリー]
    - 重点: 現場の悩み（ペインポイント） → 組合の伴走支援解決策 → 実際の成果。
    - 構成: 共感（現場の課題） → 伴走支援（解決へのプロセス） → 成果（現場の笑顔、技術の継承）。
    - トーン: 温かみがあり、距離感が近く、物語のように自然な記述。
  `,
  faq: `
    [STYLE C — FAQ・解説型]
    - 重点: 質疑応答形式（Q&A）で疑問をダイレクトに解消。
    - 構成: 各H2を共通の質問(Q)とし、その下に簡潔な回答(A)と箇条書きを展開する。
    - トーン: 中小企業の経営者が一読して理解できる平易なビジネス言語で記述する。
  `,
  result: `
    [STYLE D — 受入実績レポート]
    - 重点: 新しい実習生・労働者の受け入れに関する公式報告。
    - 構成: 入国概要 → 入国前教育 → 入国後講習・配属 → 今後の展望。
    - トーン: 厳格かつプロフェッショナルでありながら、歓迎の意を込めた温かい表現。
  `,
};

function buildPrompt(topic: string, category: string, style: string): string {
  const styleKey = style || 'casestudy';
  const styleInstruction = STYLE_INSTRUCTIONS[styleKey] || STYLE_INSTRUCTIONS.casestudy;

  return `
あなたは一流のB2Bコピーライターであり、外国人技能実習制度および育成就労制度に精通した監理団体の専門家です。
所属: 「ソリューション協同組合」（大阪府堺市）。
ターゲット層: 中小企業（主に製造業・建設業・農業）の経営者および人事担当者。

トピック: "${topic}"
カテゴリ: "${category}"
現在のコンテキスト: 令和8年 (2026年)。育成就労制度が技能実習制度に代わり本格運用されています。

[使用禁止語句]
- 丸投げ、人手不足、安い労働力

[ポジティブキーワード（自然に2〜3個使用）]
- 意欲ある若手人材の定着、熟練技術の継承、職場の活性化、現場に寄り添うサポート

[スタイル指示]
${styleInstruction}

[フォーマット]
- H2(##) H3(###) を使用。箇条書き(*)、ボールド(**)で重要ポイントを強調。
- 本文は最大1200文字。

以下のキーを持つ有効な単一のJSONオブジェクトのみを返してください：
{
  "title": "(60文字以内) B2B向けの見出し",
  "excerpt": "(60文字以内) 一文の要約",
  "content": "(最大1200文字) Markdown形式の本文。署名は含めないこと。",
  "meta_description": "(120文字以内) SEO用メタディスクリプション"
}

JSON形式以外（解説やMarkdownフェンス等）は一切含めないでください。
`;
}

export interface AiArticleOutput {
  title: string;
  excerpt: string;
  content: string;
  meta_description: string;
}

/**
 * Calls Google Gemini AI directly from the browser.
 * Gets the API key from /api/ai/token (protected by admin session).
 */
export async function generateArticleFromBrowser(
  topic: string,
  category: string,
  style: string
): Promise<AiArticleOutput> {
  // Step 1: Get the API key from the server (protected endpoint)
  const tokenRes = await fetch('/api/ai/token');
  if (!tokenRes.ok) throw new Error('認証エラー: APIキーを取得できませんでした');
  const { key } = await tokenRes.json();
  if (!key) throw new Error('APIキーが設定されていません (GEMINI_API_KEY)');

  // Step 2: Call Google AI directly from the browser (browser IP, not VPS IP)
  const prompt = buildPrompt(topic, category, style);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: 'application/json' },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || JSON.stringify(data);
    throw new Error(`Google AI Error: ${errorMsg}`);
  }

  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error('Geminiからの応答が無効です');

  const aiOutput: AiArticleOutput = JSON.parse(textOutput);

  // Validate required fields
  const required: (keyof AiArticleOutput)[] = ['title', 'excerpt', 'content', 'meta_description'];
  for (const key of required) {
    if (!aiOutput[key]) throw new Error(`必須フィールド不足: ${key}`);
  }

  return aiOutput;
}
