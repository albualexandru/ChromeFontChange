const STYLE_ELEMENT_ID = 'chrome-font-change-style';

function renderFontStyle(fontId) {
  const font = getFontOption(fontId);

  let styleElement = document.getElementById(STYLE_ELEMENT_ID);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = STYLE_ELEMENT_ID;
    (document.head || document.documentElement).appendChild(styleElement);
  }

  styleElement.textContent = `
    html,
    body,
    body :not(svg):not(path):not(script):not(style):not(noscript):not(textarea):not(input) {
      font-family: ${font.cssFamily} !important;
    }
  `;
}

async function loadAndApplyPreferredFont() {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  renderFontStyle(stored[STORAGE_KEY]);
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message && message.type === 'applyFont') {
    renderFontStyle(message.fontId);
  }

  sendResponse();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes[STORAGE_KEY]) {
    renderFontStyle(changes[STORAGE_KEY].newValue);
  }
});

loadAndApplyPreferredFont();
