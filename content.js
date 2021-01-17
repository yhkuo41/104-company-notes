chrome.runtime.sendMessage({ todo: "showPageAction" }); // send msg to eventPage.js

// getCompanyInfoInCompayPage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.todo === 'getCompanyInfoInCompayPage') {
        let companyName = $('.h1:first').text().trim();
        chrome.storage.local.get(companyName, companyInfo => {
            if (companyInfo[companyName] != undefined) {
                sendResponse(companyInfo);
            } else {
                sendResponse({ [companyName]: {} });
            }
        });
        // must return true to avoid 'The message port closed before a response was received.'
        return true;
    }
});

// Find rating and change background color of company name
$(document).ready(() => {
    let url = location.href;
    const searchPageRegex104 = new RegExp('https://www.104.com.tw/jobs/search/', 'i');
    const jobPageRegex104 = new RegExp('https://www.104.com.tw/job/', 'i');
    const companyPageRegex104 = new RegExp('https://www.104.com.tw/company/', 'i');

    if (url.match(searchPageRegex104) != null) {
        let companySelector = 'a[title^=公司名]';
        let companyNames = $(companySelector).text().trim().split(/\s+/);
        changeCompanyNameBg(companySelector, companyNames)
    } else if (url.match(jobPageRegex104) != null) {
        // Because the company name element will be loaded first on the job vacancy page, but the text will not, so the text of the page title will be used instead.
        let companySelector = 'a[data-gtm-head=公司名稱]';
        window.setTimeout(() => {
            let companyNames = [$('title').text().trim().split('｜')[1]];
            changeCompanyNameBg(companySelector, companyNames)
        }, 500);
    } else if (url.match(companyPageRegex104) != null) {
        // For the same reason as above
        let companySelector = '.h1:first';
        window.setTimeout(() => {
            let companyNames = [$(companySelector).text().trim()];
            changeCompanyNameBg(companySelector, companyNames)
        }, 500);
    }
});

function changeCompanyNameBg(companySelector, companyNames) {
    chrome.storage.local.get(companyNames, companyInfos => {
        for (let i = 0; i < companyNames.length; i++) {
            let companyName = companyNames[i];
            if (companyInfos[companyName] != undefined) {
                let rating = companyInfos[companyName].rating;
                $(companySelector).eq(i).addClass('company-note-' + rating + '-star');
            }
        }
    });
}