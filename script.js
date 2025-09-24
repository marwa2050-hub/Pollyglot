// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");

  if (btn) {
    btn.addEventListener("click", async () => {
      const text = document.getElementById("inputText").value;
      const lang = document.querySelector("input[name='lang']:checked").value;

      if (!text.trim()) {
        alert("Please enter some text to translate.");
        return;
      }

      try {
        // Call free LibreTranslate API
        const resp = await fetch("https://translate.astian.org/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: "en",
            target: lang,
            format: "text"
          })
        });

        const data = await resp.json();

        // Save in localStorage
        localStorage.setItem("original", text);
        localStorage.setItem("language", lang);
        localStorage.setItem("translated", data.translatedText);

        // Go to result page
        window.location.href = "result.html";

      } catch (err) {
        console.error("Translation error:", err);
        alert("Sorry, translation service is not available right now.");
      }
    });
  }

  // Show texts on result page
  if (document.getElementById("originalText")) {
    document.getElementById("originalText").innerText =
      localStorage.getItem("original") || "";
    document.getElementById("translatedText").innerText =
      localStorage.getItem("translated") || "";
  }
});