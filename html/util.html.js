var _matchInput;

function clean(input) {
    // var input = shadowRoot.getElementById(input);
    input.value = '';
}

function setFocus(input) {
    setTimeout(() => {
        // var name = shadowRoot.getElementById(input);
        input.focus();
        input.scrollIntoView();
    }, 100)

}

function barMessage(text) {
    window.parent.postMessage({ bar: text }, "*");
}

function actionFilterLetter(query, url, status) {
    if (ITEMS.length > 0) {
        var itemFinded = ITEMS.find(_ => _.name.toLowerCase() === query.toLowerCase());
        if (itemFinded)
            matchInput(itemFinded.name, url, status);

        var matches = getSuggestions(query, ITEMS.map(_ => _.name));

        if (matches.length > 0) {
            let element = displaySuggestions(matches, (value) => {
    
                matchInput(value, url, status);
                go(url.value);
            });

            window.parent.postMessage({ maxHeight: element.offsetHeight + 130 }, "*");
        }

        
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

function go(url) {
    var newTab = document.getElementById("newTab");

    if (newTab.checked)
        window.parent.postMessage({ url, action:'createNewTab'}, "*");
       // chrome.runtime.sendMessage({ action: "createNewTab", url });
    else
        window.parent.postMessage({ url, action:'currentTab'}, "*");
       // window.location.href = url;
}

function matchInput(name, url, status) {
    var item = ITEMS.find(_ => _.name === name);

    // barMessage(`Matched with ${name} [Press Enter to proceed.]`);
    // status.innerText = 'ok';

    if (item) {
        _matchInput = true;
        // filter.value = item.name;
        url.value = item.url;
    }
}
