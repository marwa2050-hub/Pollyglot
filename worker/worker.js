addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function handle(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body;
  try { body = await req.json(); } catch { return new Response('Invalid JSON', { status: 400 }); }

  const { text, target } = body;
  if (!text || !target) return new Response('Missing text or target', { status: 400 });

  const systemPrompt = "You are a precise translator. Return ONLY the translation.";
  const userPrompt = `Translate into ${target}: """${text}"""`;

  const payload = {
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.4,
    max_tokens: 800,
  };

  const resp = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) return new Response("OpenAI error", { status: resp.status });
  const data = await resp.json();
  const translation = data.choices?.[0]?.message?.content?.trim() || "";

  return new Response(JSON.stringify({ translation }), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}