async function tryGetActiveTabId() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tab?.id ?? null;
}

async function initializePopup() {
  const selectElement = document.getElementById('fontSelect');
  const statusElement = document.getElementById('status');
  const applyButton = document.getElementById('applyButton');
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const selectedFont = getFontOption(stored[STORAGE_KEY]);

  populateFontChoices(selectElement, selectedFont.id);

  applyButton.addEventListener('click', async () => {
    const nextFont = getFontOption(selectElement.value);
    statusElement.textContent = '';

    await chrome.storage.sync.set({
      [STORAGE_KEY]: nextFont.id
    });

    const activeTabId = await tryGetActiveTabId();
    if (activeTabId) {
      await chrome.tabs.sendMessage(activeTabId, {
        type: 'applyFont',
        fontId: nextFont.id
      }).catch((error) => {
        console.warn('ChromeFontChange could not update the current tab.', error);
        statusElement.textContent = `Saved ${nextFont.label}, but this page cannot be modified (for example, Chrome system pages are protected).`;
      });
    }

    if (!statusElement.textContent) {
      statusElement.textContent = `Applied ${nextFont.label}.`;
    }
  });
}

initializePopup();
