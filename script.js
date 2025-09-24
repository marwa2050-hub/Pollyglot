// app.js
const $ = id => document.getElementById(id);
const q = sel => document.querySelector(sel);

const inputText = $('inputText');
const translateBtn = $('translateBtn');
const clearBtn = $('clearBtn');
const resultCard = $('resultCard');
const originalText = $('originalText');
const translatedText = $('translatedText');
const startoverBtn = $('startoverBtn');
const copyBtn = $('copyBtn');
const tempRange = $('tempRange');
const tempVal = $('tempVal');
const resultLang = $('resultLang');
const errorEl = $('error');

const flags = { French: '🇫🇷 French', Spanish: '🇪🇸 Spanish', Japanese: '🇯🇵 Japanese' };

tempRange?.addEventListener('input', () => { tempVal.textContent = tempRange.value; });

function getSelectedLang(){
  const r = document.querySelector('input[name="lang"]:checked');
  return r ? r.value : null;
}

function showError(msg){
  errorEl.textContent = msg || '';
  if(msg) setTimeout(()=> errorEl.textContent = '', 4000);
}

// Translate
translateBtn.addEventListener('click', async () => {
  errorEl.textContent = '';
  const text = inputText.value.trim();
  const lang = getSelectedLang();
  if(!text){ showError('Please enter text to translate.'); return; }
  if(!lang){ showError('Please choose a language.'); return; }

  translateBtn.disabled = true;
  translateBtn.textContent = 'Translating…';

  originalText.textContent = text;
  resultLang.textContent = flags[lang] ?? lang;

  try {
    const resp = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        target: lang,
        temperature: Number(tempRange?.value ?? 0.4),
        max_tokens: 800
      })
    });

    if(!resp.ok){
      const t = await resp.text();
      translatedText.textContent = 'Error: ' + resp.status;
      console.error('Worker Error', resp.status, t);
    } else {
      const data = await resp.json();
      translatedText.textContent = data.translation || '[No translation returned]';
    }

    // show result
    resultCard.classList.remove('hidden');
    resultCard.setAttribute('aria-hidden','false');
    // scroll into view
    resultCard.scrollIntoView({behavior:'smooth', block:'center'});
  } catch (e) {
    console.error(e);
    showError('Network error. Check console.');
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = 'Translate';
  }
});

// Clear / Reset
clearBtn.addEventListener('click', () => {
  inputText.value = '';
  errorEl.textContent = '';
  inputText.focus();
});

startoverBtn.addEventListener('click', () => {
  resultCard.classList.add('hidden');
  resultCard.setAttribute('aria-hidden','true');
});

// Copy
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(translatedText.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1400);
  } catch {
    alert('Copy failed');
  }
});