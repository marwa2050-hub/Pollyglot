// آدرس دقیق Worker خودت
const workerURL = "https://weathered-shape-29ba.9pp2ts6jwm.workers.dev/";

// انتخاب عناصر HTML
const inputText = document.getElementById("inputText");
const translateBtn = document.getElementById("translateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const results = document.getElementById("results");
const originalText = document.getElementById("originalText");
const translatedText = document.getElementById("translatedText");

// دکمه ترجمه
translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  const language = document.querySelector('input[name="language"]:checked');

  if (!text) {
    alert("⚠️ لطفاً متن خود را وارد کنید.");
    return;
  }
  if (!language) {
    alert("⚠️ لطفاً یک زبان انتخاب کنید.");
    return;
  }

  results.classList.remove("hidden");
  originalText.textContent = text;
  translatedText.textContent = "⏳ در حال ترجمه...";

  try {
    const response = await fetch(workerURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        target: language.value,
      }),
    });

    if (!response.ok) {
      const errMsg = await response.text();
      translatedText.textContent = `❌ Error: ${errMsg}`;
      return;
    }

    const data = await response.json();
    translatedText.textContent =
      data.translation || "❌ هیچ ترجمه‌ای دریافت نشد.";
  } catch (err) {
    translatedText.textContent = "⚠️ Failed to connect to server.";
    console.error("Translation error:", err);
  }
});

// دکمه ریست
resetBtn.addEventListener("click", () => {
  inputText.value = "";
  translatedText.textContent = "";
  originalText.textContent = "";
  results.classList.add("hidden");
});

// دکمه کپی
copyBtn.addEventListener("click", () => {
  const textToCopy = translatedText.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("✅ کپی شد!");
  });
});