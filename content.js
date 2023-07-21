"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const box_util_js_1 = require("./src/box.util.js");
const index_js_1 = require("./src/global/index.js");
const move_js_1 = require("./src/move.js");
var _variables_loaded = false;
var shorcutValue = 'CtrlX';
document.addEventListener('click', function (event) {
    if ((0, box_util_js_1.isMenuOpened)() && (0, box_util_js_1.clickOutOfBox)(event.target))
        (0, box_util_js_1.hideBalloon)();
});
chrome.storage.local.get('fav', function (result) {
    if (result.fav) {
        (0, index_js_1.setItems)([...(0, index_js_1.getItems)(), ...result.fav]);
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
        (0, index_js_1.setShorcutValue)(result.shorcutValue);
    }
});
window.addEventListener('load', function (e) {
    (0, move_js_1.loadMoveEvents)();
});
//# sourceMappingURL=content.js.map