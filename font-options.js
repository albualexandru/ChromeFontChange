const STORAGE_KEY = 'preferredFont';
const DEFAULT_FONT_ID = 'google-sans';
const AVAILABLE_FONTS = [
  {
    id: DEFAULT_FONT_ID,
    label: 'Google Sans',
    cssFamily: '"Google Sans", sans-serif'
  },
  {
    id: 'arial',
    label: 'Arial',
    cssFamily: 'Arial, sans-serif'
  },
  {
    id: 'helvetica-neue',
    label: 'Helvetica Neue',
    cssFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  {
    id: 'georgia',
    label: 'Georgia',
    cssFamily: 'Georgia, serif'
  },
  {
    id: 'times-new-roman',
    label: 'Times New Roman',
    cssFamily: '"Times New Roman", serif'
  },
  {
    id: 'trebuchet-ms',
    label: 'Trebuchet MS',
    cssFamily: '"Trebuchet MS", sans-serif'
  },
  {
    id: 'verdana',
    label: 'Verdana',
    cssFamily: 'Verdana, sans-serif'
  },
  {
    id: 'courier-new',
    label: 'Courier New',
    cssFamily: '"Courier New", monospace'
  }
];

function getFontOption(fontId) {
  return AVAILABLE_FONTS.find((font) => font.id === fontId) || AVAILABLE_FONTS[0];
}
