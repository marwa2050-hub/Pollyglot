document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const lang = document.querySelector("input[name='language']:checked")?.value;

  if (!text.trim() || !lang) {
    alert("Please enter text and select a language.");
    return;
  }

  try {
    const resp = await fetch("https://weathered-shape-29ba.9pp2ts6jwm.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: lang })
    });

    const data = await resp.json();
    document.getElementById("resultBox").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("resultBox").innerText = "⚠️ Error: " + err.message;
  }
});