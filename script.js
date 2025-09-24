const translateBtn = document.getElementById("translateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const resultBox = document.getElementById("result");
const originalText = document.getElementById("originalText");
const translatedText = document.getElementById("translatedText");
const userText = document.getElementById("userText");

// Translate Button
translateBtn.addEventListener("click", async () => {
  const text = userText.value.trim();
  if (!text) {
    alert("Please enter text to translate.");
    return;
  }

  const lang = document.querySelector("input[name='lang']:checked").value;

  // Show loading
  translatedText.innerText = "Translating...";
  resultBox.classList.remove("hidden");
  originalText.innerText = text;

  // Simulate API call (replace with real API later)
  setTimeout(() => {
    translatedText.innerText = `[${lang} Translation] → ${text}`;
  }, 1200);
});

// Reset Button
resetBtn.addEventListener("click", () => {
  userText.value = "";
  resultBox.classList.add("hidden");
});

// Copy Button
copyBtn.addEventListener("click", () => {
  const text = translatedText.innerText;
  navigator.clipboard.writeText(text);
  alert("Translation copied to clipboard!");
});