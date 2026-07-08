function fillFontOptions(selectElement, selectedFontId) {
  selectElement.replaceChildren();

  AVAILABLE_FONTS.forEach((font) => {
    const option = document.createElement('option');
    option.value = font.id;
    option.textContent = font.label;
    option.style.fontFamily = font.cssFamily;
    option.selected = font.id === selectedFontId;
    selectElement.appendChild(option);
  });
}

async function initializeOptions() {
  const selectElement = document.getElementById('fontSelect');
  const saveButton = document.getElementById('saveButton');
  const statusElement = document.getElementById('status');
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const selectedFont = getFontOption(stored[STORAGE_KEY]);

  fillFontOptions(selectElement, selectedFont.id);

  saveButton.addEventListener('click', async () => {
    const nextFont = getFontOption(selectElement.value);

    await chrome.storage.sync.set({
      [STORAGE_KEY]: nextFont.id
    });

    statusElement.textContent = `Saved ${nextFont.label} as your preferred font.`;
  });
}

initializeOptions();
