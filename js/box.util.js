let ITEMS = [];

function showBalloon(x, y) {

    balloon = shadowRoot.getElementById("balloon");

    x= x || 0;
    y= y || 0;

    balloon.style.display = "block";

    var url = shadowRoot.getElementById("url");

    url.value = window.location.href;

    balloon.style.left = x + "px";
    balloon.style.top = y + "px";
}

function hideBalloon() {
    balloon = shadowRoot.getElementById("balloon");
    balloon.style.display = "none";
}

function isMenuOpened() {
    if (!shadowRoot) return;

    const balloon = shadowRoot.getElementById("balloon");
    if (balloon)
        return balloon.style.display === 'block';
}

function clickOutOfBox(obj) {

    if (obj == null)
        return true;

    if (obj.shadowRoot !== undefined && obj.shadowRoot !== null)
        return false;

    if (obj.nodeName === 'INPUT' || obj.nodeName === 'TEXTAREA')
        return false;

    if (obj.id != _BOX_ID)// && obj.id != _divVeryMatch_IMAGEN)
        return clickOutOfBox(obj.parentNode);

    return false;
}