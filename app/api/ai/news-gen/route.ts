import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    const prompt = `
      You are an elite B2B professional copywriter and SEO expert for "Solution Cooperative" (ソリューション協同組合), a Japanese Supervising Organization (監理団体) located in Sakai, Osaka.
      
      TASK: Create a professional news article for the corporate website based on the topic provided.
      TOPIC: "${topic}"
      CATEGORY: "${category}"
      
      REQUIREMENTS:
      1. Tone: Professional Business Japanese (Keigo), Trustworthy, Stable.
      2. Audience: CEOs and HR Managers of Japanese Host Companies (受入企業).
      3. Guidelines:
         - Focus on compliance and expert support.
         - Mention the transition to the new "Ikusei Shuro" (育成就労) system if relevant.
         - Use Markdown for the content body.
      
      OUTPUT FORMAT: Return ONLY a valid JSON object with the following fields:
      - "title": (String) Professional and catchy headline.
      - "content": (String) Detailed article body in Markdown (use headers, lists, bold text where appropriate).
      - "seoTitle": (String) SEO-optimized title (max 60 chars).
      - "seoDescription": (String) Compelling meta description (max 160 chars).
      
      JSON ONLY. NO OTHER TEXT.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {

      return NextResponse.json({ error: 'AI Error' }, { status: 500 });
    }

    // Parse the generated text into JSON
    const aiOutput = JSON.parse(data.candidates[0].content.parts[0].text);

    return NextResponse.json(aiOutput);
  } catch (error) {

    return NextResponse.json({ error: 'AI Generation failed' }, { status: 500 });
  }
}
