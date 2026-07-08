async function initializeOptions() {
  const selectElement = document.getElementById('fontSelect');
  const saveButton = document.getElementById('saveButton');
  const statusElement = document.getElementById('status');
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const selectedFont = getFontOption(stored[STORAGE_KEY]);

  populateFontChoices(selectElement, selectedFont.id);

  saveButton.addEventListener('click', async () => {
    const nextFont = getFontOption(selectElement.value);

    await chrome.storage.sync.set({
      [STORAGE_KEY]: nextFont.id
    });

    statusElement.textContent = `Saved ${nextFont.label} as your preferred font.`;
  });
}

initializeOptions();
