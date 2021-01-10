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
  chrome.runtime.getPlatformInfo(function (info) {
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

$(document).ready(function () {
  // check if popup in company page, if not, change the UI
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    let companyPageRegex = /https:\/\/www.104.com.tw\/company\//;
    if (url.match(companyPageRegex) == null) {
      $('input, textarea, button').attr('disabled', true);
      $('button[type="submit"]').text('請在公司頁面新增／修改Note');
    } else {
      $('#companyURL').val(url);
    }
  });

  // add or update note
  $('#addOrUpdateNote').submit(function () {
    let companyName = $('#companyName').val();
    let companyURL = $('#companyURL').val();
    let note = $('#note').val();
    let rating = $('input[name="star"]:checked').val();

    if (!rating) {
      $('#invalid-feedback-rating').show();
      return false;
    }

    rating = -rating + 6; // because the rating bar is {flex-direction: row-reverse;}

    let companyNoteJson = {
      "companyName": companyName,
      "companyURL": companyURL,
      "note": note,
      "rating": rating
    };

    window.close();
  });

  // clear rating error msg
  $('input[type=radio]').on('change', function () {
    let rating = $('input[name="star"]:checked').val();
    if (rating) {
      $('#invalid-feedback-rating').css('display', 'none');
    }
  });
});