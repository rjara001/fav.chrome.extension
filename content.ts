import { clickOutOfBox, hideBalloon, isMenuOpened } from "./src/box.util.js";
import { getItems, setItems, setShorcutValue } from "./src/global/index.js";
import { loadMoveEvents } from "./src/move.js";

var _variables_loaded = false;
var shorcutValue = 'CtrlX';

document.addEventListener('click', function (event) {
    if (isMenuOpened() && clickOutOfBox(event.target))
        hideBalloon();
});

chrome.storage.local.get('fav', function (result) {
    if (result.fav) {
        setItems([...getItems(), ...result.fav]);
        _variables_loaded = true;
    }
});
// chrome.runtime.sendMessage({ action: 'getStorage' }, function(response) {
//     // Handle the response from the background script
//     // console.log(response);
//     if (response.shorcutValue) {
//         shorcutValue = response.shorcutValue;
//     }
//   });
  chrome.storage.local.get(function (result) {

    if (result.shorcutValue) {
        setShorcutValue(result.shorcutValue);
    }
});


window.addEventListener('load', function (e) {
    loadMoveEvents();
});
