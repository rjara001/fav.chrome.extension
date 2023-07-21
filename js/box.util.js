let ITEMS = [];
function addEllipsis(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}
function barMessage(text) {
    var status = balloon.querySelector(".status-bar");
    status.innerText = text;
}

export function resizeIframe(size:number) {
    var iframe = getShadowRoot().getElementById('ifav');
    iframe.style.height = `${size}px`;
}

function showBalloon(x, y) {

    balloon = getShadowRoot().getElementById("balloon");

    x = x || 0;
    y = y || 0;

    balloon.style.display = "block";

    // var url = getShadowRoot().getElementById("url");

    // url.value = window.location.href;

    balloon.style.left = x + "px";
    balloon.style.top = y + "px";

    var iframe = getShadowRoot().getElementById('ifav');
    const domain = URL_IFRAME.split('/')[0] + '//' + URL_IFRAME.split('/')[2];

    iframe.contentWindow.postMessage({ items: ITEMS, currentUrl: window.location.href }, domain);
}

function hideBalloon() {
    balloon = getShadowRoot().getElementById("balloon");
    balloon.style.display = "none";
}

export function isMenuOpened() {
    if (!getShadowRoot()) return;

    const balloon = getShadowRoot().getElementById("balloon");
    if (balloon)
        return balloon.style.display === 'block';
}

function clickOutOfBox(obj) {

    if (obj == null)
        return true;

    if (obj.getShadowRoot() !== undefined && obj.getShadowRoot() !== null)
        return false;

    if (obj.nodeName === 'INPUT' || obj.nodeName === 'TEXTAREA')
        return false;

    if (obj.id != _BOX_ID)// && obj.id != _divVeryMatch_IMAGEN)
        return clickOutOfBox(obj.parentNode);

    return false;
}

function shortcutValue(event) {

    // console.log('ctrlKey:' + event.ctrlKey + 'shiftKey:' + event.shiftKey + 'key:' + event.key);
    // console.log('value:' + (event.ctrlKey===true && event.shiftKey && (event.key === "x" || event.key === "X")));
    // console.log('X:' + (event.key === "x" || event.key === "X"));
    // console.log(shorcutValue)

    switch (shorcutValue) {
        case _MODE_SHORTCUT.CtrlShiftX: return event.ctrlKey && event.shiftKey && (event.key === "x" || event.key === "X");
        case _MODE_SHORTCUT.CtrlShiftF: return event.ctrlKey && event.shiftKey && (event.key === "f" || event.key === "F");
        case _MODE_SHORTCUT.CtrlShiftD: return event.ctrlKey && event.shiftKey && (event.key === "d" || event.key === "D");
        default: return event.ctrlKey && (event.key === "x" || event.key === "X");
    }
}