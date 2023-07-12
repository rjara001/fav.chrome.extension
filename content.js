
var _variables_loaded = false;
var shorcutValue = 'CtrlX';

document.addEventListener('click', function (event) {
    if (isMenuOpened() && clickOutOfBox(event.target))
        hideBalloon();
});

chrome.storage.local.get('fav', function (result) {
    if (result.fav) {
        ITEMS = [...ITEMS, ...result.fav];
        _variables_loaded = true;
    }
});
chrome.runtime.sendMessage({ action: 'getStorage' }, function(response) {
    // Handle the response from the background script
    // console.log(response);
    if (response.shorcutValue) {
        shorcutValue = response.shorcutValue;
    }
  });

window.addEventListener('load', function (e) {
    loadMoveEvents();
});
