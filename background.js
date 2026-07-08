importScripts('font-options.js');

const CONTEXT_MENU_ROOT_ID = 'change-page-font';
const CONTEXT_MENU_FONT_PREFIX = 'font-option:';

async function createContextMenus() {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const selectedFontId = getFontOption(stored[STORAGE_KEY]).id;

  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ROOT_ID,
    title: 'Change page font',
    contexts: ['all']
  });

  AVAILABLE_FONTS.forEach((font) => {
    chrome.contextMenus.create({
      id: `${CONTEXT_MENU_FONT_PREFIX}${font.id}`,
      parentId: CONTEXT_MENU_ROOT_ID,
      title: font.label,
      type: 'radio',
      checked: font.id === selectedFontId,
      contexts: ['all']
    });
  });
}

function applyFontToTab(tabId, fontId) {
  if (!tabId) {
    return;
  }

  chrome.tabs.sendMessage(tabId, {
    type: 'applyFont',
    fontId
  }).catch((error) => {
    console.warn('ChromeFontChange could not update the current tab.', error);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const menuItemId = String(info.menuItemId);

  if (!menuItemId.startsWith(CONTEXT_MENU_FONT_PREFIX)) {
    return;
  }

  const fontId = menuItemId.replace(CONTEXT_MENU_FONT_PREFIX, '');
  const selectedFont = getFontOption(fontId);

  await chrome.storage.sync.set({
    [STORAGE_KEY]: selectedFont.id
  });

  applyFontToTab(tab && tab.id, selectedFont.id);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes[STORAGE_KEY]) {
    createContextMenus();
  }
});
