document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");

    chrome.storage.sync.get("observerEnabled", (data) => {
        toggle.checked = data.observerEnabled || false;
    });

    toggle.addEventListener("change", () => {
        chrome.runtime.sendMessage({ action: "toggleObserver" }, (response) => {
            toggle.checked = response.observerEnabled;
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});
