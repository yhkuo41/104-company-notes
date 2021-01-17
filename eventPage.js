
const regex104 = '*://www.104.com.tw/*';
// onInstalled  
chrome.runtime.onInstalled.addListener(function () {
    queryTabsAndShowPageActions({
        "active": false,
        "currentWindow": true,
        "url": regex104
    });
});

// tabs.onUpdated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    queryTabsAndShowPageActions({
        "active": true,
        "currentWindow": true,
        "url": regex104
    });
});

// tabs.onActivated
chrome.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {
    queryTabsAndShowPageActions({
        "active": true,
        "currentWindow": true,
        "url": regex104
    });
});

// find all tabs on the browser
function queryTabsAndShowPageActions(queryObject) {
    chrome.tabs.query(queryObject,
        function (tabs) {
            if (tabs && tabs.length > 0) {
                for (var i = 0; i < tabs.length; i++) {
                    // pageAction.show on loaded tabs
                    if (tabs[i].status === "complete") chrome.pageAction.show(tabs[i].id);
                }
            }
        }
    );
}
