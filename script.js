// app.js (ویرایش شده)
const $ = id => document.getElementById(id);

const inputText = $('inputText');
const translateBtn = $('translateBtn');
const originalText = $('originalText');
const translatedText = $('translatedText');
const copyBtn = $('copyBtn');
const resultSection = $('results');
const resetBtn = $('resetBtn');

// Language selector
function getSelectedLang(){
  const r = document.querySelector('input[name="language"]:checked');
  return r ? r.value : null;
}

// Translate button
translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  const lang = getSelectedLang();

  if(!text || !lang){
    alert("Please enter text and choose a language.");
    return;
  }

  translateBtn.disabled = true;
  translateBtn.textContent = "Translating…";

  try {
    const resp = await fetch("https://libretranslate.com/translate", {
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

    originalText.textContent = text;
    translatedText.textContent = data.translatedText || "[No translation]";
    resultSection.classList.remove("hidden");

  } catch (e) {
    console.error(e);
    alert("Translation failed. Please try again.");
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  inputText.value = "";
  resultSection.classList.add("hidden");
});

// Copy button
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(translatedText.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(()=> copyBtn.textContent = "📋 Copy", 1200);
  } catch {
    alert("Copy failed");
  }
});