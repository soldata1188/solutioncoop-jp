import { NextResponse } from 'next/server';

// ============================================================
//  MASTER PROMPT SCHEMA — AI NEWS GENERATION
//  Ràng buộc: OTIT / Cục XNC / B2B SME Compliance
//  Version: 2.0 (2026-04-18)
// ============================================================

const STYLE_INSTRUCTIONS: Record<string, string> = {
  policy: `
    [STYLE A — Policy / Tin tức luật]
    - Trọng tâm: Mốc thời gian, quy định mới (育成就労制度), con số và rủi ro pháp lý.
    - Cấu trúc: Tình hình hiện tại → Điểm thay đổi quan trọng → Tác động đến doanh nghiệp → Hành động khuyến nghị.
    - Văn phong: Chính xác, rõ ràng, giàu dữ liệu. Nhấn mạnh deadline và mức phạt nếu vi phạm.
    - Luôn bám sát thời điểm hiện tại: 令和8年 (2026年).
  `,
  casestudy: `
    [STYLE B — Case Study / Thực tế]
    - Trọng tâm: Kể chuyện theo mô hình: Nỗi đau của xưởng → Giải pháp đồng hành của Nghiệp đoàn → Kết quả thực tế.
    - Cấu trúc: 共感 (Cảm thông vấn đề) → 伴走支援 (Đồng hành giải pháp) → 成果 (Kết quả: tiếng cười trong xưởng, kỹ thuật được lưu truyền).
    - Văn phong: Ấm áp, gần gũi, kể chuyện tự nhiên. Trích dẫn lời Giám đốc xưởng cho chân thực.
  `,
  faq: `
    [STYLE C — FAQ / Hướng dẫn]
    - Trọng tâm: Trực diện, chia theo dạng Hỏi-Đáp.
    - Cấu trúc: Mỗi H2 là một câu hỏi phổ biến (Q). Dưới mỗi H2 là câu trả lời ngắn gọn (A) với bullet points.
    - Văn phong: Giải thích luật phức tạp thành ngôn ngữ kinh doanh đơn giản nhất. Giám đốc SME đọc xong phải hiểu ngay.
  `,
};

const FEW_SHOT_EXAMPLE = `
[FEW-SHOT EXAMPLE — Style B (Case Study)]
{
  "title": "「現場の会話が明るくなった」— 地方の町工場が取り組む、若手人材と歩む技術継承のカタチ",
  "excerpt": "言葉の壁を越え、熟練の技を次世代へ。現場に寄り添う日本語教育が職場に活気をもたらします。",
  "content": "## 現場の悩みは「言葉」ではなく「心の距離」でした\\n\\nある従業員15名の加工企業様では、意欲ある若手人材を受け入れたものの、当初は技術指導の際、細かいニュアンスが伝わらないことに不安を抱えておられました。\\n\\n「教えたい技術はたくさんある。でも、どう伝えればいいのか…」\\n\\nそんな社長様の声に寄り添い、当組合では一般的な教室での学習ではなく、**「その現場ですぐに使える生きた言葉」**を中心とした伴走支援を行いました。\\n\\n## 伴走型支援で変わる職場の雰囲気\\n\\n私たちが大切にしたのは、以下の3点です：\\n\\n* **現場特有の用語集作成:** 工具の名前や作業指示を、写真付きで分かりやすく整理しました。\\n* **交換日記の活用:** 毎日の小さな気づきを共有することで、心の距離を縮めました。\\n* **定期的な面談支援:** 社長様、既存スタッフ様、そして若手人材の三者が本音で話せる場を設けました。\\n\\n## 技術の継承、そして次なるステップへ\\n\\n半年が経過した現在、現場では「おはよう！」という元気な声が響き、ベテラン職人が若手に熱心に技を伝える光景が日常となりました。若手人材の定着は、単なる労働力の確保ではなく、**「技術を次の世代へつなぐ」**という社長様の願いを叶える大きな力となっています。\\n\\nこれからも私たちは、地域の皆様の最も身近なパートナーとして、現場の温度感を大切にした支援を続けてまいります。\\n\\n---\\n*最新の制度移行に関する詳しい資料は、当サイトの「育成就労移行ロードマップ」より無料でダウンロードいただけます。*",
  "meta_description": "地方の町工場での受け入れ事例をご紹介。言葉の壁をなくし、熟練技術を若手へ継承。当組合が実践する、現場に寄り添う伴走型支援のリアルをお伝えします。"
}
`;

function buildMasterPrompt(topic: string, category: string, style: string): string {
  const styleKey = style || 'casestudy';
  const styleInstruction = STYLE_INSTRUCTIONS[styleKey] || STYLE_INSTRUCTIONS.casestudy;

  return `
You are an Elite B2B Web Copywriter and Japanese Supervising Organization (監理団体) Specialist.
Project: "Solution Cooperative" (ソリューション協同組合). Location: Sakai-shi, Osaka (堺市、大阪).
Target Audience: CEOs and HR Managers of small/medium manufacturing companies (中小製造業の経営者・人事担当者).

TOPIC: "${topic}"
CATEGORY: "${category}"
CURRENT CONTEXT: 令和8年 (2026年). 育成就労制度 is actively replacing 技能実習制度.

═══════════════════════════════════════════
1. LEGAL & PSYCHOLOGICAL CONSTRAINTS
═══════════════════════════════════════════

[NEGATIVE PROMPT — ABSOLUTE BAN]
You MUST NEVER use these phrases anywhere in the output:
- 丸投げ (Khoán trắng)
- 人手不足 (Thiếu hụt nhân sự)
- 安い労働力 (Lao động giá rẻ)
- 二人三脚の伴走型支援
Severely limit use of: グローバル人材 (too macro/impersonal for SME audience).

[POSITIVE KEYWORDS — WEAVE NATURALLY]
Incorporate at least 2-3 of these throughout the article:
- 意欲ある若手人材の定着 (Giữ chân người trẻ nhiệt huyết)
- 熟練技術の継承 (Kế thừa kỹ thuật lành nghề)
- 職場の活性化 (Thổi bùng sinh khí nơi làm việc)
- いつでも相談できる身近なパートナー (Đối tác gần gũi luôn sẵn sàng)
- 現場に寄り添うサポート (Hỗ trợ sát sao hiện trường)

[TONE & MOOD]
- Professional (Keigo) but 地域密着 (community-rooted) and 温かみ (warm, empathetic).
- Write as if a trusted advisor is having tea with a factory owner, discussing their workforce future.
- Avoid robotic repetition. Each paragraph must feel fresh and purposeful.

═══════════════════════════════════════════
2. CONTENT STRUCTURE REQUIREMENTS
═══════════════════════════════════════════

${styleInstruction}

[FORMATTING RULES]
- Use H2 (##) and H3 (###) headers to structure information.
- Use bullet points (*) for lists. Use **bold** for key benefits.
- Short paragraphs: max 2-3 sentences each. Frequent spacing.
- Max 1200 characters for "content".
- Final line: A subtle, warm CTA leading to the LP or resource page.
- Do NOT use horizontal rules (---) except before the final CTA note.

═══════════════════════════════════════════
3. OUTPUT FORMAT (STRICT JSON)
═══════════════════════════════════════════

Return ONLY a valid JSON object with these exact keys:
{
  "title": "(Under 60 chars) Catchy B2B headline. Include benefit + topic.",
  "excerpt": "(Under 60 chars) One-sentence summary. Goes directly to homepage cards. Must state the core problem/solution.",
  "content": "(Max 1200 chars) Markdown body. H2/H3, bullets, bold. End with CTA.",
  "meta_description": "(Under 120 chars) SEO meta description. Start with main keyword. Benefit-driven."
}

JSON ONLY. NO OTHER TEXT. NO MARKDOWN FENCES.

═══════════════════════════════════════════
4. FEW-SHOT LEARNING EXAMPLE
═══════════════════════════════════════════
${FEW_SHOT_EXAMPLE}

Use the example above as a REFERENCE for tone, structure, and length.
Adapt style based on the STYLE instruction above.
`;
}


export async function POST(req: Request) {
  try {
    const { topic, category, style } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured (GEMINI_API_KEY)' }, { status: 500 });
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
      return NextResponse.json({ error: 'AI Error', details: data }, { status: 500 });
    }

    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return NextResponse.json(
        { error: 'AI Error', details: 'Empty or invalid response from Gemini', raw: data },
        { status: 500 }
      );
    }

    const aiOutput = JSON.parse(textOutput);

    // Validate required fields
    const required = ['title', 'excerpt', 'content', 'meta_description'];
    for (const key of required) {
      if (!aiOutput[key]) {
        return NextResponse.json(
          { error: `Missing field: ${key}`, output: aiOutput },
          { status: 422 }
        );
      }
    }

    return NextResponse.json(aiOutput);
  } catch (error: any) {
    console.error('AI Catch Error:', error);
    return NextResponse.json({ error: 'AI Generation failed', details: error.message }, { status: 500 });
  }
}
