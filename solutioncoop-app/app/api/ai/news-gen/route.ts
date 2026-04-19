import { NextResponse } from 'next/server';

// ============================================================
//  MASTER PROMPT SCHEMA — AI NEWS GENERATION
//  制約条件: OTIT / 出入国在留管理庁 / B2B SME コンプライアンス遵守
//  Version: 3.0 (2026-04-18)
// ============================================================

const STYLE_INSTRUCTIONS: Record<string, string> = {
  policy: `
    [STYLE A — 政策・法改正ニュース]
    - 重点: 実施時期、新制度（育成就労制度）の具体的な変更点、法的リスクと数字。
    - 構成: 現在の状況 → 重要な変更点 → 企業への影響 → 推奨されるアクション。
    - トーン: 正確、明快、豊富なデータ。違反時の罰則や期限を強調する。
    - 文脈: 令和8年 (2026年) の最新情報を常に意識すること。
  `,
  casestudy: `
    [STYLE B — 導入事例・ストーリー]
    - 重点: 現場の悩み（ペインポイント） → 組合の伴走支援解決策 → 実際の成果。
    - 構成: 共感（現場の課題） → 伴走支援（解決へのプロセス） → 成果（現場の笑顔、技術の継承）。
    - トーン: 温かみがあり、距離感が近く、物語のように自然な記述。経営者の生の声を取り入れ、リアリティを高める。
  `,
  faq: `
    [STYLE C — FAQ・解説型]
    - 重点: 質疑応答形式（Q&A）で疑問をダイレクトに解消。
    - 構成: 各H2を共通の質問(Q)とし、その下に簡潔な回答(A)と箇条書きを展開する。
    - トーン: 複雑な法律用語を、中小企業の経営者が一読して理解できる平易なビジネス言語に変換する。
  `,
  result: `
    [STYLE D — 受入実績レポート]
    - 重点: 新しい実習生・労働者の受け入れに関する公式報告。
    - 基本構成:
      H2 1: 入国概要 — 期生、国籍、人数、職種、入国日、配属先地域を明記。
      H2 2: 入国前教育と準備 — 日本語教育、規律・礼節教育、健康診断、書類準備の徹底を強調。
      H2 3: 入国後講習・配属の流れ — 講習の内容、安全衛生教育、企業への配属プロセスを記述。
      H2 4: 今後の展望 — 技术の継承、企業との絆、将来の成長への期待。
    - トーン: 厳格かつプロフェッショナルでありながら、歓迎の意を込めた温かい表現。具体的な数字を用いる。
    - カテゴリ: 自動的に "result" に設定。
  `,
};

const FEW_SHOT_EXAMPLE = `
[FEW-SHOT EXAMPLE — Style B (Case Study)]
{
  "title": "「現場の会話が明るくなった」— 地方の町工場が取り組む、若手人材と歩む技術継承のカタチ",
  "excerpt": "言葉の壁を越え、熟練の技を次世代へ。現場に寄り添う日本語教育が職場に活気をもたらします。",
  "content": "## 現場の悩みは「言葉」ではなく「心の距離」でした\\n\\nある従業員15名の加工企業様では、意欲ある若手人材を受け入れたものの、当初は技術指導の際、細かいニュアンスが伝わらないことに不安を抱えておられました。\\n\\n「教えたい技術はたくさんある。でも、どう伝えればいいのか…」\\n\\nそんな社長様の声に寄り添い、当組合では一般的な教室での学習ではなく、**「その現場ですぐに使える生きた言葉」**を中心とした伴走支援を行いました。\\n\\n## 伴走型支援で変わる職場の雰囲気\\n\\n私たちが大切にしたのは、以下の3点です：\\n\\n* **現場特有の用語集作成:** 工具の名前や作業指示を、写真付きで分かりやすく整理しました。\\n* **交換日記の活用:** 毎日の小さな気づきを共有することで、心の距離を縮めました。\\n* **定期的な面談支援:** 社長様、既存スタッフ様、そして若手人材の三者が本音で話せる場を設けました。\\n\\n## 技術の継承、そして次なるステップへ\\n\\n半年が経過した現在、現場では「おはよう！」という元気な声が響き、ベテラン職人が若手に熱心に技を伝える光景が日常となりました。若手人材の定着は、単なる労働力の確保ではなく、**「技術を次の世代へつなぐ」**という社長様の願いを叶える大きな力となっています。\\n\\nこれからも私たちは、地域の皆様の最も身近なパートナーとして、現場の温度感を大切にした支援を続けてまいります。",
  "meta_description": "地方の町工場での受け入れ事例をご紹介。言葉の壁をなくし、熟練技術を若手へ継承。当組合が実践する、現場に寄り添う伴走型支援のリアルをお伝えします。"
}
`;

function buildMasterPrompt(topic: string, category: string, style: string): string {
  const styleKey = style || 'casestudy';
  const styleInstruction = STYLE_INSTRUCTIONS[styleKey] || STYLE_INSTRUCTIONS.casestudy;

  return `
あなたは一流のB2Bコピーライターであり、外国人技能実習制度および育成就労制度に精通した監理団体の専門家です。
所属: 「ソリューション協同組合」（大阪府堺市）。
ターゲット層: 中小企業（主に製造業・建設業・農業）の経営者および人事担当者。

トピック: "${topic}"
カテゴリ: "${category}"
現在のコンテキスト: 令和8年 (2026年)。育成就労制度が技能実習制度に代わり本格運用されています。

═══════════════════════════════════════════
1. 表現上の制約とコンプライアンス
═══════════════════════════════════════════

[ネガティブプロンプト — 使用禁止語句]
以下の表現は、出力のいかなる場所でも使用してはなりません：
- 丸投げ (法的責任の放棄を示唆するため厳禁)
- 人手不足 (単なる労働力不足という表現は避け、人材育成の観点で記述)
- 安い労働力 (不適切な労働環境を連想させるため厳禁)
- 二人三脚の伴走型支援 (冗長な表現のため避ける)
※グローバル人材という言葉は、中小企業の現場にはマクロすぎることが多いため、極力控えめに使用してください。

[ポジティブキーワード — 自然に織り込むこと]
記事全体を通して、以下のキーワードのうち少なくとも2〜3個を取り入れてください：
- 意欲ある若手人材の定着
- 熟練技術の継承
- 職場の活性化
- いつでも相談できる身近なパートナー
- 現場に寄り添うサポート

[トーン＆マナー]
- 丁寧語（敬語）を使用しつつ、地域密着型の親しみやすさと温かみを感じさせるスタイル。
- 工場のオーナーと信頼できるアドバイザーがお茶を飲みながら将来の展望を語り合っているような雰囲気。
- ロボットのような単調な記述を避け、段落ごとに明確な意図を持たせること。

═══════════════════════════════════════════
2. コンテンツ構造要件
═══════════════════════════════════════════

${styleInstruction}

[フォーマットルール]
- H2 (##) および H3 (###) ヘッダーを使用して情報を整理する。
- リストには箇条書き (*) を使用する。**ボールド**を使用してメリットを強調する。
- 各段落は最大2〜3文とし、適度な空白を設ける。
- 本文 (content) は最大1200文字程度とする。

═══════════════════════════════════════════
3. 出力形式 (厳密なJSON)
═══════════════════════════════════════════

以下のキーを持つ有効な単一のJSONオブジェクトのみを返してください：
{
  "title": "(60文字以内) B2B向けの目を引く見出し。ベネフィットとトピックを含むこと。",
  "excerpt": "(60文字以内) ホームページのカードに表示される一文の要約。課題と解決策を明示する。",
  "content": "(最大1200文字) Markdown形式の本文。H2/H3、箇条書き、ボールドを使用。※署名は含めないでください（システムが自動付与します）。",
  "meta_description": "(120文字以内) SEO用メタディスクリプション。メインキーワードから始め、メリットを訴求する。"
}

JSON形式以外（解説やMarkdownフェンス等）は一切含めないでください。

═══════════════════════════════════════════
4. フューショット・ラーニング（具体例）
═══════════════════════════════════════════
${FEW_SHOT_EXAMPLE}

上記の例をトーン、構造、長さのリファレンスとして使用してください。
adapt style based on the STYLE instruction above.
`;
}

export async function POST(req: Request) {
  try {
    const { topic, category, style } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!topic) {
      return NextResponse.json({ error: 'トピックは必須です' }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: 'APIキーが設定されていません (GEMINI_API_KEY)' }, { status: 500 });
    }

    const prompt = buildMasterPrompt(topic, category || 'news', style || 'casestudy');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
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
      console.error('AI Error:', data);
      const errorMsg = data.error?.message || JSON.stringify(data);
      return NextResponse.json({ error: `AI Detail: ${errorMsg}`, details: data }, { status: 500 });
    }

    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return NextResponse.json(
        { error: 'AI Error', details: 'Geminiからの応答が無効です', raw: data },
        { status: 500 }
      );
    }

    const aiOutput = JSON.parse(textOutput);

    // Validate required fields
    const required = ['title', 'excerpt', 'content', 'meta_description'];
    for (const key of required) {
      if (!aiOutput[key]) {
        return NextResponse.json(
          { error: `必須フィールド不足: ${key}`, output: aiOutput },
          { status: 422 }
        );
      }
    }

    return NextResponse.json(aiOutput);
  } catch (error: any) {
    console.error('AI Catch Error:', error);
    return NextResponse.json({ error: 'AI生成に失敗しました', details: error.message }, { status: 500 });
  }
}
