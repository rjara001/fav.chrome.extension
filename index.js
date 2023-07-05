
var lastClientX, lastClientY;
// Function to show the balloon message
var shadowRoot;

function setFocus() {
    setTimeout(() => {
        var name = shadowRoot.getElementById("name");
        name.focus();
        name.scrollIntoView();
    }, 100)

}
// Function to hide the balloon message
function hideBalloon() {
    balloon.style.display = "none";
}
// document.addEventListener("DOMContentLoaded", function () {
//     var nameInput = document.getElementById("nameInput");
//     nameInput.focus();
// });

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
    
    if ((event.ctrlKey || event.metaKey) && event.key === "x") {
        showBalloon(lastClientX, lastClientY);
        // name.focus();
        setFocus();
    }
}

// Function to show the balloon message at the specified coordinates
function showBalloon(x, y) {
    var url = shadowRoot.getElementById("url");
    var balloon = shadowRoot.getElementById("balloon");

    url.innerText = window.location.href;

    balloon.style.display = "block";
    balloon.style.left = x + "px";
    balloon.style.top = y + "px";
}

$(document).ready(function () {

    // var showBalloonButton = document.getElementById("showBalloon");
    var container = document.createElement("div");



    shadowRoot = container.attachShadow({ mode: 'open' });

    // Create a new HTML element
    var balloonDiv = document.createElement("div");
    balloonDiv.classList.add("balloon");
    balloonDiv.id = "balloon";
    balloonDiv.innerHTML = `
        <div class="balloon-header">
          <h3>Balloon</h3>
          <span class="close-btn">&times;</span>
        </div>
        <div id="url">https://</div>
        <div class="item">
          <input type="text" id="name" placeholder="Enter name" autofocus>
        </div>
        <button id="save">Save</button>
        <hr>
        <div class="item">
          <input type="text" id="filter" placeholder="Enter filter">
        </div>
      `;

    // Append the created element to the document body
    shadowRoot.appendChild(balloonDiv);

    // Optional: Add event listeners or further functionality to the added HTML code

    // Example close button functionality
    var closeButton = balloonDiv.querySelector(".close-btn");
    closeButton.addEventListener("click", function () {
        shadowRoot.removeChild(balloonDiv);
    });

 

    var closeBtn = shadowRoot.querySelector(".close-btn");
    closeBtn.addEventListener('click', () => {
        hideBalloon();
    });

});
