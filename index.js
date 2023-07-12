
var shadowRoot;
var balloon;
var _matchInput = false;

function barMessage(text) {
    var status = balloon.querySelector(".status-bar");
    status.innerText = text;
}

function save() {
    var url = shadowRoot.getElementById("url");
    var name = shadowRoot.getElementById("name");

    if (!ITEMS.find(_ => _.name === name.value))
        localSaveValue({ name: name.value, url: url.value, date: (new Date()).toISOString() });

        barMessage('saved successfully');
}

function clean(input) {
    var input = shadowRoot.getElementById(input);
    input.value = '';
}

function setFocus(input) {
    setTimeout(() => {
        var name = shadowRoot.getElementById(input);
        name.focus();
        name.scrollIntoView();
    }, 100)

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
        clean('filter');
        setFocus('filter');
    }
}
// Function to show the balloon message at the specified coordinates

$(document).ready(function () {

    var container = document.createElement("div");

    container.setAttribute("id", _BOX_ID);

    document.body.appendChild(container);

    shadowRoot = container.attachShadow({ mode: 'closed' });

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

    // Example close button functionality
    var closeButton = balloon.querySelector(".close-btn");
    var saveButton = balloon.querySelector("#save");
    var name = balloon.querySelector("#name");
    var filter = balloon.querySelector("#filter");
    var url = balloon.querySelector("#url");
    var header = balloon.querySelector(".balloon-header");
    var status = balloon.querySelector(".status");    

    header.addEventListener('mousedown', startDragging);

    closeButton.addEventListener("click", function () {
        hideBalloon();
    });

    saveButton.addEventListener("click", function () {
        save();
    });

    saveButton.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && url.value) {
            save();
        }
    });
 
    filter.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
            var suggestionsList = shadowRoot.getElementById("suggestionsList");
            var selectedItem = suggestionsList.querySelector(".selected");
          
            if (selectedItem) {
              var nextItem = selectedItem.nextElementSibling;
              if (nextItem) {
                selectedItem.classList.remove("selected");
                nextItem.classList.add("selected");
                barMessage(`Matched with ${nextItem.innerText} [Press Enter to proceed.]`);
              }
            } else {
              var firstItem = suggestionsList.querySelector("li");
              if (firstItem) {
                firstItem.classList.add("selected");
              }
            }
            
          }
          
          if (event.key === "ArrowUp") {
            var suggestionsList = shadowRoot.getElementById("suggestionsList");
            var selectedItem = suggestionsList.querySelector(".selected");
          
            if (selectedItem) {
              var previousItem = selectedItem.previousElementSibling;
              if (previousItem) {
                selectedItem.classList.remove("selected");
                previousItem.classList.add("selected");
                barMessage(`Matched with ${previousItem.innerText} [Press Enter to proceed.]`);
              }
            }
          }
        if (event.key === "Enter") {
            var suggestionsList = shadowRoot.getElementById("suggestionsList");
            var selectedItem = suggestionsList.querySelector(".selected");

            if (selectedItem)
                actionFilterLetter(selectedItem.innerText, url, status);

            actionFilterEnter(url, event);    
        }

        var query = event.target.value + event.key;
        if (event.key === "Backspace")
            return;

        actionFilterLetter(query, url, status);
    });

    hideBalloon();
});

function actionFilterLetter(query, url, status) {
    if (ITEMS.length > 0) {
        var itemFinded = ITEMS.find(_ => _.name.toLowerCase() === query.toLowerCase());
        if (itemFinded)
            matchInput(itemFinded.name, url, status);

        var matches = getSuggestions(query, ITEMS.map(_ => _.name));
        if (matches.length > 0)
            displaySuggestions(matches, (value) => {
                matchInput(value, url, status);
                go(url.value);
            });

    }
}

function actionFilterEnter(url, event) {
    if (_matchInput)
        go(url.value);
    else {
        var itemsFiltered = ITEMS.filter(_ => _.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
        if (itemsFiltered.length === 1)
            go(itemsFiltered[0].url);
    }
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

function go(url) {
    var newTab = balloon.querySelector("#newTab");

    barMessage(`Moving to the selected URL: ${addEllipsis(url,40)}`);

    if (newTab.checked)
        chrome.runtime.sendMessage({ action: "createNewTab", url });
    else    
        window.location.href = url;
}

function matchInput(name, url, status) {
    var item = ITEMS.find(_ => _.name === name);

    barMessage(`Matched with ${name} [Press Enter to proceed.]`);
    // status.innerText = 'ok';

    if (item) {
        _matchInput = true;
        // filter.value = item.name;
        url.value = item.url;
    }
}

