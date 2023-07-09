var selectedShortCutValue = 'CtrlX'; // Variable to store the selected value

var radioButtons = document.querySelectorAll("input[name='menu-active']");
var instructions = document.querySelector(".instructions");

function handleRadioButtonChange(event) {
    selectedShortCutValue = event.target.value;
    let elementSelected =  Array.from(radioButtons).find(_=>_.value===selectedShortCutValue)
    if (elementSelected.nextElementSibling)
        instructions.innerText = elementSelected.nextElementSibling.textContent;
    console.log("Selected Value: ", elementSelected.nextElementSibling.textContent);
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
                  instructions.innerText = elementSelected.nextElementSibling.textContent;
            }
          }
    });
}