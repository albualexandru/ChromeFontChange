const GENERIC_FONT_FAMILIES = new Set([
  'sans-serif',
  'serif',
  'monospace'
]);

const STORAGE_KEY = 'preferredFont';
const DEFAULT_FONT_ID = 'google-sans';
const AVAILABLE_FONTS = [
  {
    id: DEFAULT_FONT_ID,
    label: 'Google Sans',
    families: ['Google Sans', 'sans-serif']
  },
  {
    id: 'arial',
    label: 'Arial',
    families: ['Arial', 'sans-serif']
  },
  {
    id: 'helvetica-neue',
    label: 'Helvetica Neue',
    families: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
  },
  {
    id: 'georgia',
    label: 'Georgia',
    families: ['Georgia', 'serif']
  },
  {
    id: 'times-new-roman',
    label: 'Times New Roman',
    families: ['Times New Roman', 'serif']
  },
  {
    id: 'trebuchet-ms',
    label: 'Trebuchet MS',
    families: ['Trebuchet MS', 'sans-serif']
  },
  {
    id: 'verdana',
    label: 'Verdana',
    families: ['Verdana', 'sans-serif']
  },
  {
    id: 'courier-new',
    label: 'Courier New',
    families: ['Courier New', 'monospace']
  }
];

function getFontOption(fontId) {
  return AVAILABLE_FONTS.find((font) => font.id === fontId) || AVAILABLE_FONTS[0];
}

function getFontCssFamily(fontId) {
  const { families } = getFontOption(fontId);

  return families.map((family) => {
    if (GENERIC_FONT_FAMILIES.has(family)) {
      return family;
    }

    return `"${family.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }).join(', ');
}

function populateFontChoices(selectElement, selectedFontId) {
  selectElement.replaceChildren();

  AVAILABLE_FONTS.forEach((font) => {
    const option = document.createElement('option');
    option.value = font.id;
    option.textContent = font.label;
    option.style.fontFamily = getFontCssFamily(font.id);
    option.selected = font.id === selectedFontId;
    selectElement.appendChild(option);
  });
}
