// app.js - PollyGlot Translation App (Frontend)

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const copyBtn = document.getElementById("copyBtn");

  // ✅ Translate button
  if (btn) {
    btn.addEventListener("click", async () => {
      const text = document.getElementById("inputText").value;
      const lang = document.querySelector("input[name='language']:checked")?.value;

      if (!text.trim()) {
        alert("Please enter some text to translate.");
        return;
      }
      if (!lang) {
        alert("Please select a target language.");
        return;
      }

      try {
        // 👇 Worker endpoint (change if Worker name changes)
        const resp = await fetch("https://weathered-shape-29ba.9pp2ts6jwm.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, target: lang }),
        });

        if (!resp.ok) throw new Error("Translation failed");

        const data = await resp.json();

        // Save results in localStorage
        localStorage.setItem("original", text);
        localStorage.setItem("translated", data.translation);

        // Redirect to result page
        window.location.href = "result.html";
      } catch (err) {
        console.error("Translation error:", err);
        alert("Sorry, translation service is not available right now.");
      }
    });
  }

  // ✅ Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }

  // ✅ Copy button
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const translatedText = localStorage.getItem("translated") || "";
      navigator.clipboard.writeText(translatedText).then(() => {
        alert("Translation copied to clipboard!");
      });
    });
  }

  // ✅ Show results on result page
  if (document.getElementById("originalText")) {
    document.getElementById("originalText").innerText =
      localStorage.getItem("original") || "";
    document.getElementById("translatedText").innerText =
      localStorage.getItem("translated") || "";
  }
});