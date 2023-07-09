
var lastClientX, lastClientY;
// Function to show the balloon message
var shadowRoot;
var balloon;
var _matchInput = false;

function save() {
    var url = shadowRoot.getElementById("url");
    var name = shadowRoot.getElementById("name");

    if (!ITEMS.find(_ => _.name === name.value))
        localSaveValue({ name: name.value, url: url.value, date: (new Date()).toISOString() });
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

// Event listener for mousemove event
document.addEventListener("mousemove", function (event) {
    // Check if the mouse is in the upper-left corner (within 50 pixels)
    lastClientX = event.clientX;
    lastClientY = event.clientY;

    if (event.clientX <= 50 && event.clientY <= 265) {
        showBalloon();
    }
});

document.addEventListener("keydown", handleKeyDown);

// Function to handle keydown event
function handleKeyDown(event) {
    // Check if the user presses Ctrl (Cmd on Mac) + F

    if (shortcutValue(event)) {
        showBalloon(lastClientX, lastClientY);
        clean('filter');
        setFocus('filter');
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

    // Example close button functionality
    var closeButton = balloon.querySelector(".close-btn");
    var saveButton = balloon.querySelector("#save");
    var name = balloon.querySelector("#name");
    var filter = balloon.querySelector("#filter");
    var url = balloon.querySelector("#url");
    var header = balloon.querySelector(".balloon-header");

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

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && url.value && name.value==='') {
            go(url.value);
        }
    });

    filter.addEventListener("input", function (event) {
        var query = event.target.value;

        if (ITEMS.length > 0) {
            var matches = getSuggestions(query, ITEMS.map(_ => _.name));

            matchInput(query, filter, url);

            displaySuggestions(matches, (value) => {
                matchInput(value, filter, url);
                go(url.value);
            });
        }
    });


    hideBalloon();
});
function shortcutValue(event) {

    console.log('ctrlKey:' + event.ctrlKey + 'shiftKey:' + event.shiftKey + 'key:' + event.key);
    console.log('value:' + (event.ctrlKey===true && event.shiftKey && (event.key === "x" || event.key === "X")));
    console.log(shorcutValue)
    switch (shorcutValue)
    {
        case _MODE_SHORTCUT.CtrlShiftX: return event.ctrlKey && event.shiftKey && (event.key === "x" || event.key === "X"); 
        case _MODE_SHORTCUT.CtrlShiftF: return event.ctrlKey && event.shiftKey && (event.key === "f" || event.key === "F"); 
        case _MODE_SHORTCUT.CtrlShiftD: return event.ctrlKey && event.shiftKey && (event.key === "d" || event.key === "D"); 
        default: return event.key === "x"; 
    }
}

function go(url) {
    window.location.href = url;
}

function matchInput(value, filter, url) {
    var item = ITEMS.find(_ => _.name === value);

    if (item) {
        _matchInput = true;
        filter.value = item.name;
        url.value = item.url;
    }
}

