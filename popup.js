function populateFontSelect(selectElement, selectedFontId) {
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

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tab && tab.id;
}

async function initializePopup() {
  const selectElement = document.getElementById('fontSelect');
  const statusElement = document.getElementById('status');
  const applyButton = document.getElementById('applyButton');
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const selectedFont = getFontOption(stored[STORAGE_KEY]);

  populateFontSelect(selectElement, selectedFont.id);

  applyButton.addEventListener('click', async () => {
    const nextFont = getFontOption(selectElement.value);

    await chrome.storage.sync.set({
      [STORAGE_KEY]: nextFont.id
    });

    const activeTabId = await getActiveTabId();
    if (activeTabId) {
      await chrome.tabs.sendMessage(activeTabId, {
        type: 'applyFont',
        fontId: nextFont.id
      }).catch(() => {});
    }

    statusElement.textContent = `Applied ${nextFont.label}.`;
  });
}

initializePopup();
