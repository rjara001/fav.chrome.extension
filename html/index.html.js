var ITEMS = [];

$(document).ready(function () {

    var saveButton = document.querySelector("#save");
    var name = document.querySelector("#name");
    var filter = document.querySelector("#filter");
    var url = document.querySelector("#url");

    var status = document.querySelector(".status");


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
            var suggestionsList = document.getElementById("suggestionsList");
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
            var suggestionsList = document.getElementById("suggestionsList");
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

            var suggestionsList = document.getElementById("suggestionsList");
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

    window.addEventListener('message', function (event) {
        // Check the origin of the message for security purposes
        ITEMS = event.data.items;
        url.value = event.data.currentUrl;

        clean(filter);
        setFocus(filter);
    });

    // // Send a message to the background script
    // chrome.runtime.sendMessage({ message: "Hello parent!" }, function (response) {
    //     // Log the response received from the background script
    //     console.log('Response received from background script:', response.response);
    // });

});

