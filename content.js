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
    const searchPageRegex104 = new RegExp('https://www.104.com.tw/jobs/search/', 'i');
    const jobPageRegex104 = new RegExp('https://www.104.com.tw/job/', 'i');
    const companyPageRegex104 = new RegExp('https://www.104.com.tw/company/', 'i');
    const memberCenterRegex104 = new RegExp('https://pda.104.com.tw/', 'i');

    if (url.match(searchPageRegex104) != null) {
        changeCompanyNameBg('a[title^=公司名]');
        document.addEventListener('scroll', () => {
            changeCompanyNameBg('a[title^=公司名]');
        });
    } else if (url.match(jobPageRegex104) != null) {
        changeCompanyNameBg('a[data-gtm-head=公司名稱]');
    } else if (url.match(companyPageRegex104) != null) {
        changeCompanyNameBg('.h1');
    } else if (url.match(memberCenterRegex104) != null) {
        changeCompanyNameBg('.info-company__text');
        document.addEventListener('scroll', () => {
            changeCompanyNameBg('.info-company__text');
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