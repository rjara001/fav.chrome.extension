var selectedShortCutValue = 'CtrlX'; // Variable to store the selected value

var radioButtons = document.querySelectorAll<HTMLInputElement>("input[name='menu-active']");
var instructions = document.querySelector(".instructions") as HTMLElement;

function handleRadioButtonChange(event:any) {
    selectedShortCutValue = event.target.value;
    let elementSelected =  Array.from(radioButtons).find((_:any)=>_.value===selectedShortCutValue)
    if (elementSelected && elementSelected.nextElementSibling)
        if (instructions)
            instructions.innerText = elementSelected.nextElementSibling.textContent as string;
    // console.log("Selected Value: ", elementSelected.nextElementSibling.textContent as string);
    chrome.storage.local.set({ shorcutValue: selectedShortCutValue });
}

if (chrome.storage) {
   
    chrome.storage.local.get(function (result) {

        if (result.shorcutValue)
            selectedShortCutValue = result.shorcutValue;
            
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener("change", handleRadioButtonChange);
            if (radioButtons[i].value === selectedShortCutValue) {
              radioButtons[i].checked = true;
              let elementSelected = radioButtons[i];
              if (elementSelected.nextElementSibling)
                if (instructions)
                    instructions.innerText = elementSelected.nextElementSibling.textContent as string;
            }
          }
    });
}