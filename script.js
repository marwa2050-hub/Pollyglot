document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");

  btn.addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const lang = document.querySelector("input[name='language']:checked")?.value;

    if (!text.trim()) {
      alert("⚠️ لطفاً متن وارد کنید");
      return;
    }
    if (!lang) {
      alert("⚠️ لطفاً زبان مقصد را انتخاب کنید");
      return;
    }

    try {
      console.log("🔹 Sending request to Worker...");

      const resp = await fetch("https://weathered-shape-29ba.9pp2ts6jwm.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target: lang }),
      });

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        const err = await resp.text();
        document.getElementById("translatedText").innerText = "❌ Error: " + err;
        return;
      }

      const data = await resp.json();
      console.log("✅ Translation result:", data);

      document.getElementById("originalText").innerText = text;
      document.getElementById("translatedText").innerText = data.translation || "❌ No translation returned.";
    } catch (err) {
      console.error("⚠️ Fetch error:", err);
      document.getElementById("translatedText").innerText = "⚠️ Failed to connect to server.";
    }
  });
});