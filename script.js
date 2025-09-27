<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PollyGlot – AI Translation App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>❤️ PollyGlot</h1>
      <p>AI-powered Translator</p>
    </header>

    <section>
      <textarea id="inputText" placeholder="Enter text to translate..."></textarea>
    </section>

    <section>
      <label><input type="radio" name="language" value="French"> 🇫🇷 French</label>
      <label><input type="radio" name="language" value="Spanish"> 🇪🇸 Spanish</label>
      <label><input type="radio" name="language" value="Japanese"> 🇯🇵 Japanese</label>
      <label><input type="radio" name="language" value="German"> 🇩🇪 German</label>
      <label><input type="radio" name="language" value="Arabic"> 🇸🇦 Arabic</label>
      <label><input type="radio" name="language" value="Persian"> 🇮🇷 Persian</label>
    </section>

    <section>
      <button id="translateBtn">Translate</button>
      <button id="resetBtn">Reset</button>
    </section>

    <section id="results" class="hidden">
      <h2>Translation Result</h2>
      <p><strong>Original:</strong> <span id="originalText"></span></p>
      <p><strong>Your translation:</strong> <span id="translatedText"></span></p>
      <button id="copyBtn">📋 Copy</button>
    </section>
  </div>

  <script src="app.js"></script>
</body>
</html>