
function localSaveValue(item) {
    ITEMS.push(item);
            
    chrome.storage.local.set({ 'fav': ITEMS }, function() {
        
    });
}

function localRemoveValue(value) {
    ITEMS = ITEMS.filter(_=>_.name !== value.name);
            
    chrome.storage.local.set({ 'fav': ITEMS }, function() {
        
    });
}

