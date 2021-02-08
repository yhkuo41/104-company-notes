// get company note in company or job page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.todo === 'getCompanyInfo') {
        let companyName = $(request.selector).text().trim();
        chrome.storage.local.get(companyName, res => {
            if (res[companyName] != undefined) {
                sendResponse(res);
            } else {
                sendResponse({ [companyName]: {} });
            }
        });
        // must return true to avoid 'The message port closed before a response was received.'
        return true;
    } else if (request.todo === 'getCompanyURL') {
        sendResponse($(request.selector).attr('href'));
        return true;
    }
});

// Find rating and change background color of company name
$(document).ready(() => {
    let url = location.href;
    const companyPageRegex104 = new RegExp('https://www.104.com.tw/company/', 'i');
    const otherPageRegex104 = new RegExp('https://www.104.com.tw/jobs/search/|https://www.104.com.tw/job/|https://pda.104.com.tw/', 'i');
    const companyLinkSelector = "a[href*='www.104.com.tw/company/']";
    let matchCompanyPage = url.match(companyPageRegex104);
    let matchOtherPage = url.match(otherPageRegex104)

    if (matchCompanyPage) {
        changeCompanyNameBg('.h1');
    } else if (matchOtherPage) {
        changeCompanyNameBg(companyLinkSelector);
        document.addEventListener('scroll', () => {
            changeCompanyNameBg(companyLinkSelector);
        });
    }
});

function changeCompanyNameBg(selector) {
    window.setTimeout(() => {
        let companyDoms = document.querySelectorAll(selector);
        for (let i = 0; i < companyDoms.length; i++) {
            let companyName = companyDoms[i].innerText.trim();
            chrome.storage.local.get(companyName, res => {
                if (res[companyName] != undefined) {
                    let rating = res[companyName].rating;
                    companyDoms[i].classList.add('company-note-' + rating + '-star');
                }
            })
        }
    }, 500) // some element load first, but its text load later, so we wait
}