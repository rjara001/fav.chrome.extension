
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

chrome.storage.local.get(function (result) {

    if (result.shorcutValue) {
        shorcutValue = result.shorcutValue;
    }
});

