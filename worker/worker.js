export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("فقط درخواست POST پذیرفته می‌شود", { status: 405 });
    }

    try {
      const { text, target } = await request.json();
      if (!text || !target) {
        return new Response(JSON.stringify({ error: "Missing text or target language" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // ✅ Call OpenAI API
      const apiResp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a translator." },
            { role: "user", content: `Translate this into ${target}: ${text}` },
          ],
        }),
      });

      const data = await apiResp.json();

      return new Response(
        JSON.stringify({ translation: data.choices?.[0]?.message?.content || "No translation" }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};