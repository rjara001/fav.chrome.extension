import { getItems, setItems } from "./global/index.js";

export function localSaveValue(item:any) {
    getItems().push(item);
            
    chrome.storage.local.set({ 'fav': getItems() }, function() {
        
    });
}

export function localRemoveValue(value:any) {
    setItems(getItems().filter((_:any)=>_.name !== value.name));
            
    chrome.storage.local.set({ 'fav': getItems() }, function() {
        
    });
}

