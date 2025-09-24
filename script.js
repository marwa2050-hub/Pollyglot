// Run when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");

  // On "Translate" button click
  if (btn) {
    btn.addEventListener("click", () => {
      const text = document.getElementById("inputText").value;
      const lang = document.querySelector("input[name='lang']:checked").value;

      // Save data in localStorage
      localStorage.setItem("original", text);
      localStorage.setItem("language", lang);

      // Temporary translation (replace with API call later)
      let fakeTranslation = `[${lang} Translation] ${text}`;
      localStorage.setItem("translated", fakeTranslation);

      // Redirect to result page
      window.location.href = "result.html";
    });
  }

  // On the result page: display saved values
  if (document.getElementById("originalText")) {
    document.getElementById("originalText").innerText = localStorage.getItem("original") || "";
    document.getElementById("translatedText").innerText = localStorage.getItem("translated") || "";
  }
});