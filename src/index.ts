import { addEllipsis, barMessage, hideBalloon, resizeIframe, shortcutValue } from "./box.util.js";
import { _BOX_ID, _HTML_BOX, _STYLE_AS_STRING } from "./constants.js";
import { getItems, getShadowRoot, setShadowRoot } from "./global/index.js";
import { handleKeyDown, startDragging } from "./move.js";
import { localSaveValue } from "./store.js";


function save() {
    var url = getShadowRoot().getElementById("url");
    var name = getShadowRoot().getElementById("name");

    if (!getItems().find((_:any) => _.name === name.value))
        localSaveValue({ name: name.value, url: url.value, date: (new Date()).toISOString() });

    barMessage('saved successfully');
}

document.addEventListener("keydown", handleKeyDown);

// Function to handle keydown event

// Function to show the balloon message at the specified coordinates

$(document).ready(function () {

    var container = document.createElement("div");

    container.setAttribute("id", _BOX_ID);

    document.body.appendChild(container);

    setShadowRoot(container.attachShadow({ mode: 'open' }));

    const balloon = getShadowRoot().getElementById("balloon");
    // Create a new HTML element
    // balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.id = "balloon";
    balloon.innerHTML = _HTML_BOX;

    // Append the created element to the document body
    getShadowRoot().appendChild(balloon);
    const linkElem = document.createElement('style');

    linkElem.innerHTML = _STYLE_AS_STRING;

    getShadowRoot().appendChild(linkElem);

    // // Example close button functionality
    var closeButton = balloon.querySelector(".close-btn");
    // var saveButton = balloon.querySelector("#save");
    // var name = balloon.querySelector("#name");
    // var filter = balloon.querySelector("#filter");
    // var url = balloon.querySelector("#url");
    var header = balloon.querySelector(".balloon-header");
    // var status = balloon.querySelector(".status");    

    header.addEventListener('mousedown', startDragging);

    closeButton.addEventListener("click", function () {
        hideBalloon();
    });

    // Add an event listener to listen for messages from the iframe
    window.addEventListener('message', function (event) {
        // Log the message received from the iframe
        console.log('Message received from iframe:', event.data);
        if (event.data.bar)
            barMessage(event.data.bar);
        if (event.data.maxHeight) {
            resizeIframe(event.data.maxHeight);
        }
        if (event.data.url) {
            barMessage(`Moving to the selected URL: ${addEllipsis(event.data.url, 40)}`);

            if (event.data.action === 'createNewTab')
                chrome.runtime.sendMessage({ action: "createNewTab", url: event.data.url });
            else
                window.location.href = event.data.url;
        }
    });

    hideBalloon();
});