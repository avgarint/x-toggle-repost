chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ observerEnabled: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleObserver") {
        chrome.storage.sync.get("observerEnabled", (data) => {
            const newState = !data.observerEnabled;
            chrome.storage.sync.set({ observerEnabled: newState });
            sendResponse({ observerEnabled: newState });
        });
        return true;
    }
});
