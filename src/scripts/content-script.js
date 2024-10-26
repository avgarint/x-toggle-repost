let observer;

function startObserver() {
    observer = new MutationObserver(() => {
        document.querySelectorAll("article").forEach((tweet) => {
            // TODO: adapt to other languages.
            if (tweet.innerText.includes("reposté")) {
                tweet.parentElement.parentElement.style.display = "none";
            }
        });
    });

    observer.observe(document, { childList: true, subtree: true });
}

function stopObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

chrome.storage.sync.get("observerEnabled", (data) => {
    // TODO: don't enable if is not on profile page.
    if (data.observerEnabled) {
        startObserver();
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.observerEnabled) {
        if (changes.observerEnabled.newValue) {
            startObserver();
        } else {
            stopObserver();
        }
    }
});
