# PollyGlot — AI Translation App

**Description**  
PollyGlot is an AI-powered translation app with a clean, modern UI. Users type text, choose a target language (French, Spanish, or Japanese), and receive a clear translation. The design includes a bird logo, language flags, and polished animations.

**Reflection (50 words)**  
Building PollyGlot helped me practice HTML, CSS, JavaScript, and integrating an API securely. The hardest part was matching the design precisely; I enjoyed polishing the UI with animations and responsive layout. This project improved my frontend skills and taught secure API handling using Cloudflare Workers.

## Files
- `index.html`, `style.css`, `app.js` — frontend
- `worker/worker.js`, `worker/wrangler.toml` — Cloudflare Worker (proxy to OpenAI)

## Setup & Deploy (step-by-step)
1. Push this repo to GitHub.
2. Deploy frontend to **Cloudflare Pages**:
   - Cloudflare → Pages → Create project → Connect GitHub → select this repo.
   - Framework: None. Build output: (leave empty if files at repo root)
3. Install Wrangler and publish Worker:
   - `npm install -g wrangler`
   - `cd worker`
   - `wrangler secret put OPENAI_API_KEY` (paste your OpenAI key)
   - `wrangler publish`
4. In Cloudflare Dashboard → Pages → find your site domain (e.g. `your-app.pages.dev`).
   - Add a Worker Route: `https://your-app.pages.dev/api/translate` → select `pollyglot-worker`.
5. Visit your site, enter text, choose a language, and Translate.

## Notes
- Do NOT include your OpenAI API key in frontend or repo.
- If you don't have access to `gpt-4`, change `model` in `worker.js` to a model you have.