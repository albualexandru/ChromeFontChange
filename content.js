const STYLE_ELEMENT_ID = 'chrome-font-change-style';
const FONT_TARGET_SELECTOR = [
  'html',
  'body',
  'p',
  'span',
  'a',
  'li',
  'dt',
  'dd',
  'label',
  'button',
  'input',
  'textarea',
  'select',
  'blockquote',
  'cite',
  'figcaption',
  'small',
  'strong',
  'em',
  'div',
  'article',
  'section',
  'main',
  'aside',
  'nav',
  'header',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'td',
  'th'
].join(', ');

function renderFontStyle(fontId) {
  let styleElement = document.getElementById(STYLE_ELEMENT_ID);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = STYLE_ELEMENT_ID;
    (document.head || document.documentElement).appendChild(styleElement);
  }

  styleElement.textContent = `
    ${FONT_TARGET_SELECTOR} {
      font-family: ${getFontCssFamily(fontId)} !important;
    }
  `;
}

async function loadAndApplyPreferredFont() {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  if (stored[STORAGE_KEY]) {
    renderFontStyle(stored[STORAGE_KEY]);
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === 'applyFont') {
    renderFontStyle(message.fontId);
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes[STORAGE_KEY]) {
    renderFontStyle(changes[STORAGE_KEY].newValue);
  }
});

loadAndApplyPreferredFont();
