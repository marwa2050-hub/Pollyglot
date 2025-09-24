addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function handle(req){
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body;
  try { body = await req.json(); } catch { return new Response('Invalid JSON', { status: 400 }); }

  const { text, target, temperature = 0.4, max_tokens = 800 } = body;
  if (!text || !target) return new Response('Missing text or target', { status: 400 });

  const systemPrompt = `You are a precise translator. Translate the user's text into the requested language. Return ONLY the translated text. Do not add explanations, transliterations, or commentary. Preserve tone and punctuation.`;
  const userPrompt = `Translate into ${target}:\n\n"""${text}"""`;

  const payload = {
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: Number(temperature),
    max_tokens: Number(max_tokens),
    n: 1
  };

  // OPENAI_API_KEY will be injected by wrangler as a secret env var
  const OPENAI_KEY = OPENAI_API_KEY;
  if (!OPENAI_KEY) return new Response('Server misconfigured: missing OPENAI_API_KEY', { status: 500 });

  const resp = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const t = await resp.text();
    return new Response(t, { status: resp.status, headers: { 'Access-Control-Allow-Origin': '*' }});
  }

  const data = await resp.json();
  const translation = data.choices?.[0]?.message?.content?.trim() ?? '';

  return new Response(JSON.stringify({ translation }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}