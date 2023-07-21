import { getItems, getShadowRoot } from "./src/global/index.js";


function save() {
    var url = getShadowRoot().getElementById("url");
    var name = getShadowRoot().getElementById("name");

    if (!getItems().find((_:any) => _.name === name.value))
        localSaveValue({ name: name.value, url: url.value, date: (new Date()).toISOString() });

    barMessage('saved successfully');
}

document.addEventListener("keydown", handleKeyDown);

// Function to handle keydown event
function handleKeyDown(event) {
    // Check if the user presses Ctrl (Cmd on Mac) + F

    if (shortcutValue(event)) {
        if (positionMouseX && positionMouseY)
            showBalloon(positionMouseX, positionMouseY);
        else
            showBalloon();

        // clean('filter');
        // setFocus('filter');
    }
}
// Function to show the balloon message at the specified coordinates

$(document).ready(function () {

    var container = document.createElement("div");

    container.setAttribute("id", _BOX_ID);

    document.body.appendChild(container);

    shadowRoot = container.attachShadow({ mode: 'open' });

    // Create a new HTML element
    balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.id = "balloon";
    balloon.innerHTML = _HTML_BOX;

    // Append the created element to the document body
    shadowRoot.appendChild(balloon);
    const linkElem = document.createElement('style');

    linkElem.innerHTML = _STYLE_AS_STRING;

    shadowRoot.appendChild(linkElem);

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

    // saveButton.addEventListener("click", function () {
    //     save();
    // });

    // saveButton.addEventListener("keydown", function (event) {
    //     if (event.key === "Enter" && url.value) {
    //         save();
    //     }
    // });

    // filter.addEventListener("keydown", function (event) {
    //     if (event.key === "ArrowDown") {
    //         var suggestionsList = shadowRoot.getElementById("suggestionsList");
    //         var selectedItem = suggestionsList.querySelector(".selected");

    //         if (selectedItem) {
    //           var nextItem = selectedItem.nextElementSibling;
    //           if (nextItem) {
    //             selectedItem.classList.remove("selected");
    //             nextItem.classList.add("selected");
    //             barMessage(`Matched with ${nextItem.innerText} [Press Enter to proceed.]`);
    //           }
    //         } else {
    //           var firstItem = suggestionsList.querySelector("li");
    //           if (firstItem) {
    //             firstItem.classList.add("selected");
    //           }
    //         }

    //       }

    //       if (event.key === "ArrowUp") {
    //         var suggestionsList = shadowRoot.getElementById("suggestionsList");
    //         var selectedItem = suggestionsList.querySelector(".selected");

    //         if (selectedItem) {
    //           var previousItem = selectedItem.previousElementSibling;
    //           if (previousItem) {
    //             selectedItem.classList.remove("selected");
    //             previousItem.classList.add("selected");
    //             barMessage(`Matched with ${previousItem.innerText} [Press Enter to proceed.]`);
    //           }
    //         }
    //       }
    //     if (event.key === "Enter") {
    //         var suggestionsList = shadowRoot.getElementById("suggestionsList");
    //         var selectedItem = suggestionsList.querySelector(".selected");

    //         if (selectedItem)
    //             actionFilterLetter(selectedItem.innerText, url, status);

    //         actionFilterEnter(url, event);    
    //     }

    //     var query = event.target.value + event.key;
    //     if (event.key === "Backspace")
    //         return;

    //     actionFilterLetter(query, url, status);
    // });

    hideBalloon();
});




