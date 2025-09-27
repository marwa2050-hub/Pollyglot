document.addEventListener("DOMContentLoaded", () => {
  const workerURL = "https://weathered-shape-29ba.9pp2ts6jwm.workers.dev/"; // Worker endpoint

  const inputText = document.getElementById("inputText");
  const translateBtn = document.getElementById("translateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const copyBtn = document.getElementById("copyBtn");
  const results = document.getElementById("results");
  const originalText = document.getElementById("originalText");
  const translatedText = document.getElementById("translatedText");

  translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const language = document.querySelector('input[name="language"]:checked');

    if (!text) {
      alert("⚠️ Please enter some text.");
      return;
    }
    if (!language) {
      alert("⚠️ Please select a language.");
      return;
    }

    results.classList.remove("hidden");
    originalText.textContent = text;
    translatedText.textContent = "⏳ Translating...";

    try {
      const response = await fetch(workerURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target: language.value }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        translatedText.textContent = `❌ Error: ${errMsg}`;
        return;
      }

      const data = await response.json();
      translatedText.textContent = data.translation || "❌ No translation returned.";
    } catch (err) {
      translatedText.textContent = "⚠️ Failed to connect to server.";
      console.error(err);
    }
  });

  resetBtn.addEventListener("click", () => {
    inputText.value = "";
    translatedText.textContent = "";
    originalText.textContent = "";
    results.classList.add("hidden");
  });

  copyBtn.addEventListener("click", () => {
    const textToCopy = translatedText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("✅ Copied to clipboard!");
    });
  });
});