$(document).ready(() => {
  // check if popup in company page
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    const companyPageRegex104 = new RegExp('https://www.104.com.tw/company/', 'i');

    if (url.match(companyPageRegex104) == null) {
      // not in company page, disabled UI
      $('input, textarea, button').attr('disabled', true);
      $('button[type="submit"]').text('請在公司頁面新增／修改Note');
      $('button[type="submit"]').removeClass('btn-primary');
      $('button[type="submit"]').addClass('btn-warning');
    } else {
      // in company page, get info
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'getCompanyInfoInCompayPage' }, fillInPopup)

      function fillInPopup(res) {
        console.log(res);
        let companyName = Object.keys(res)[0];
        let companyInfo = res[companyName];
        $('#companyName').val(companyName);
        $('#companyURL').val(url);

        if (companyInfo != undefined) {
          let rating = 6 - companyInfo.rating;
          $('#note').text(companyInfo.note);
          $('#star' + rating).prop('checked', true);
        }
      }
    }
  });

  // add or update note
  $('#addOrUpdateNote').submit(() => {
    let companyName = $('#companyName').val().trim();
    let companyURL = $('#companyURL').val();
    let note = $('#note').val();
    let rating = $('input[name="star"]:checked').val();

    if (!rating) {
      $('#invalid-feedback-rating').show();
      return false;
    }

    rating = -rating + 6; // because the rating bar is {flex-direction: row-reverse;}
    let companyInfo = {
      "companyURL": companyURL,
      "note": note,
      "rating": rating
    };

    chrome.storage.local.set({ [companyName]: companyInfo });
    window.close();
  });

  // clear rating error msg
  $('input[type=radio]').on('change', () => {
    let rating = $('input[name="star"]:checked').val();
    if (rating) {
      $('#invalid-feedback-rating').css('display', 'none');
    }
  });
});

/**
 * Temporary workaround for secondary monitors on MacOS where redraws don't happen
 * @See https://bugs.chromium.org/p/chromium/issues/detail?id=971701
 */
if (
  // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
  window.screenLeft < 0 ||
  window.screenTop < 0 ||
  window.screenLeft > window.screen.width ||
  window.screenTop > window.screen.height
) {
  chrome.runtime.getPlatformInfo((info) => {
    if (info.os === 'mac') {
      const fontFaceSheet = new CSSStyleSheet()
      fontFaceSheet.insertRule(`
          @keyframes redraw {
            0% {
              opacity: 1;
            }
            100% {
              opacity: .99;
            }
          }
        `)
      fontFaceSheet.insertRule(`
          html {
            animation: redraw 1s linear infinite;
          }
        `)
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        fontFaceSheet,
      ]
    }
  })
}