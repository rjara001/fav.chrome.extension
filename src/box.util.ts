import { URL_IFRAME, _BOX_ID, _MODE_SHORTCUT } from "./constants.js";
import { getItems, getShadowRoot, getShorcutValue } from "./global/index.js";

export function addEllipsis(text:string, maxLength:number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}
export function barMessage(text:string) {
    const balloon = getShadowRoot().getElementById("balloon");

    var status = balloon.querySelector(".status-bar");
    status.innerText = text;
}

export function resizeIframe(size:number) {
    var iframe = getShadowRoot().getElementById('ifav');
    iframe.style.height = `${size}px`;
}

export function showBalloon(x?:number, y?:number) {

    const balloon = getShadowRoot().getElementById("balloon");

    x = x || 0;
    y = y || 0;

    balloon.style.display = "block";

    // var url = getShadowRoot().getElementById("url");

    // url.value = window.location.href;

    balloon.style.left = x + "px";
    balloon.style.top = y + "px";

    var iframe = getShadowRoot().getElementById('ifav');
    const domain = URL_IFRAME.split('/')[0] + '//' + URL_IFRAME.split('/')[2];

    iframe.contentWindow.postMessage({ items: getItems(), currentUrl: window.location.href }, domain);
}

export function hideBalloon() {
    const balloon = getShadowRoot().getElementById("balloon");
    balloon.style.display = "none";
}

export function isMenuOpened() {
    if (!getShadowRoot()) return;

    const balloon = getShadowRoot().getElementById("balloon");
    if (balloon)
        return balloon.style.display === 'block';
}

export function clickOutOfBox(obj:any) {

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

export function shortcutValue(event:any) {

    // console.log('ctrlKey:' + event.ctrlKey + 'shiftKey:' + event.shiftKey + 'key:' + event.key);
    // console.log('value:' + (event.ctrlKey===true && event.shiftKey && (event.key === "x" || event.key === "X")));
    // console.log('X:' + (event.key === "x" || event.key === "X"));
    // console.log(shorcutValue)

    switch (getShorcutValue()) {
        case _MODE_SHORTCUT.CtrlShiftX: return event.ctrlKey && event.shiftKey && (event.key === "x" || event.key === "X");
        case _MODE_SHORTCUT.CtrlShiftF: return event.ctrlKey && event.shiftKey && (event.key === "f" || event.key === "F");
        case _MODE_SHORTCUT.CtrlShiftD: return event.ctrlKey && event.shiftKey && (event.key === "d" || event.key === "D");
        default: return event.ctrlKey && (event.key === "x" || event.key === "X");
    }
}