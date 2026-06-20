import { NextResponse } from 'next/server';

// ============================================================
//  AI TITLE-ONLY GENERATOR — ソリューション協同組合
//  目的: SEO最適化されたタイトル・メタデータのみを生成
//  制約: OTIT / 育成就労法 / B2B SME コンプライアンス遵守
//  Version: 4.0 (2026-06-20)
// ============================================================

function buildTitlePrompt(topic: string, category: string): string {
  // カテゴリ別ヒント
  const categoryHints: Record<string, string> = {
    news:   '📢 組合からのお知らせ・一般情報',
    result: '✅ 受入実績・配属報告（具体的な職種・国籍・人数・地域を含めること）',
    system: '📋 制度解説・法改正情報（育成就労制度の最新動向を意識すること）',
    event:  '🎯 イベント・セミナー告知（日時・開催形式・参加メリットを意識すること）',
  };
  const hint = categoryHints[category] || categoryHints.news;

  return `
あなたは「ソリューション協同組合」（大阪府堺市・技能実習監理団体）の
B2B SEOコピーライターです。

## ミッション
以下のトピックに基づき、**タイトルとSEOメタデータのみ**を生成してください。
本文の生成は一切不要です。

## トピック
${topic}

## カテゴリ
${hint}

## 現在のコンテキスト (令和8年 / 2026年)
- 技能実習制度 → 育成就労制度への移行期
- ターゲット: 中小企業（製造業・建設業・農業）の経営者・人事担当者
- 監理支援機関への移行認可申請中

---

## 厳守事項（コンプライアンス）

### 使用禁止語句 ❌
- 丸投げ / 完全お任せ（法的責任放棄の示唆）
- 人手不足（労働力不足という表現を避け、人材育成の視点で記述）
- 安い労働力 / 格安（不適切な労働環境を連想）
- グローバル人材（中小企業現場には大袈裟すぎる）

### 推奨フレーム ✅
- 意欲ある若手人材の定着と育成
- 熟練技術の次世代継承
- 確実な法令順守サポート
- 煩雑な手続きの負担軽減
- 現場に寄り添うパートナーシップ

---

## タイトル設計ルール

### mainTitle（UI表示用・カードに表示）
- **文字数**: 50〜85文字（スマホで2〜3行に自然に折り返される長さ）
- **構造**: 【カテゴリ/ターゲット】 + 状況・課題 + 具体的な解決策・実績 + 得られるメリット
- **必須**: 職種・国籍・人数・施策など、具体的な数値や固有名詞を1つ以上含める
- **例**:
  - 結果型: 「【受入実績】愛知県製造業でインドネシア技能実習生4名が配属完了！入国前教育から現場配属まで一貫サポートの全記録」
  - 制度型: 「【育成就労制度】2027年施行に向けた受入企業の移行準備チェックリスト｜今すぐ確認すべき3つのポイント」

### seoTitle（Google検索結果表示用）
- **文字数**: 30〜38文字（Google省略なし）
- **必須**: 末尾に「ソリューション協同組合」を含める
- **形式**: [主要キーワード] + [具体的な内容] + ｜ソリューション協同組合
- **例**: 「育成就労 移行準備チェックリスト｜ソリューション協同組合」

### seoDescription（メタディスクリプション）
- **文字数**: 100〜120文字（Googleプレビューに最適）
- **構造**: 主要キーワードから始め → 内容の要点 → 行動喚起（無料相談など）
- **例**: 「2027年施行の育成就労制度への移行準備を徹底解説。受入企業が今すぐ確認すべきポイントをわかりやすくまとめました。無料相談はソリューション協同組合まで。」

---

## 出力形式（JSONのみ・他の文字を一切含めない）

\`\`\`
{
  "title": "（50〜85文字のメインタイトル）",
  "seoTitle": "（30〜38文字のSEOタイトル）",
  "seoDescription": "（100〜120文字のメタディスクリプション）"
}
\`\`\`

JSONオブジェクト以外（説明文・コードフェンス・改行）は一切出力しないでください。
`.trim();
}

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'トピックは必須です' }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: 'APIキーが設定されていません (GEMINI_API_KEY)' }, { status: 500 });
    }

    const prompt = buildTitlePrompt(topic.trim(), category || 'news');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: 'application/json',
            response_schema: {
              type: 'object',
              properties: {
                title:          { type: 'string', description: '50〜85文字のメインタイトル' },
                seoTitle:       { type: 'string', description: '30〜38文字のSEOタイトル（末尾に｜ソリューション協同組合）' },
                seoDescription: { type: 'string', description: '100〜120文字のメタディスクリプション' },
              },
              required: ['title', 'seoTitle', 'seoDescription'],
            },
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error?.message || JSON.stringify(data);
      console.error('[AI] Gemini API error:', errorMsg);
      return NextResponse.json({ error: `AI Error: ${errorMsg}` }, { status: 500 });
    }

    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return NextResponse.json({ error: 'AIからの応答が空です', raw: data }, { status: 500 });
    }

    // JSONを抽出 (コードブロックに包まれている場合も対応)
    const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI応答がJSON形式ではありません', raw: textOutput }, { status: 422 });
    }

    const aiOutput = JSON.parse(jsonMatch[0]);

    // 必須フィールドチェック
    const required = ['title', 'seoTitle', 'seoDescription'];
    for (const key of required) {
      if (!aiOutput[key]) {
        return NextResponse.json({ error: `必須フィールド不足: ${key}`, output: aiOutput }, { status: 422 });
      }
    }

    // 文字数チェック・警告
    const warnings: string[] = [];
    if (aiOutput.title.length < 40) warnings.push(`title短め: ${aiOutput.title.length}文字`);
    if (aiOutput.seoTitle.length > 40) warnings.push(`seoTitle長め: ${aiOutput.seoTitle.length}文字`);
    if (aiOutput.seoDescription.length > 130) warnings.push(`seoDescription長め: ${aiOutput.seoDescription.length}文字`);

    return NextResponse.json({
      title:          aiOutput.title,
      seoTitle:       aiOutput.seoTitle,
      seoDescription: aiOutput.seoDescription,
      ...(warnings.length > 0 ? { warnings } : {}),
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[AI] Catch error:', msg);
    return NextResponse.json({ error: 'AI生成に失敗しました', details: msg }, { status: 500 });
  }
}
