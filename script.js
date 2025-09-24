const translateBtn = document.getElementById("translateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const resultBox = document.getElementById("result");
const originalText = document.getElementById("originalText");
const translatedText = document.getElementById("translatedText");
const userText = document.getElementById("userText");

translateBtn.addEventListener("click", async () => {
  const text = userText.value.trim();
  if (!text) {
    alert("Please enter text to translate.");
    return;
  }
  const lang = document.querySelector("input[name='lang']:checked").value;

  // show loading
  translatedText.innerText = "⏳ Translating...";
  resultBox.classList.remove("hidden");
  originalText.innerText = text;

  try {
    const resp = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: lang })
    });

    if (!resp.ok) {
      translatedText.innerText = "⚠️ Error: " + resp.status;
      return;
    }

    const data = await resp.json();
    translatedText.innerText = data.translation || "⚠️ No translation";
  } catch (e) {
    translatedText.innerText = "⚠️ Network error";
  }
});

resetBtn.addEventListener("click", () => {
  userText.value = "";
  resultBox.classList.add("hidden");
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(translatedText.innerText);
  alert("Translation copied!");
});