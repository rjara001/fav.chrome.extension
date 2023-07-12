const NAME_EXTENSION = 'Speed Bookmark';
const _BOX_ID = '__speed_bookmark_id';
const _MODE_SHORTCUT = { CtrlX: 'CtrlX', CtrlShiftX: 'CtrlShiftX', CtrlShiftF: 'CtrlShiftF', CtrlShiftD: 'CtrlShiftD' };

const _HTML_BOX = `
<div class="balloon-header">
      <h3>Speed Shortcut</h3>
      <span class="close-btn">&times;</span>
    </div>
    <iframe src='html/html-box.html' style="border-width: 0px;"></iframe>
    <div class="status-bar"></div>
  `;

const _STYLE_AS_STRING = `  
  :host {
    all: initial; /* Reset all styles */
    display: block; /* Make the host element a block-level element */
  }
  .balloon {
    position: fixed;
    padding: 2px;
    background-color: #f1f1f1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    display: none;
    z-index: 9999;
    width: 400px;
  }
  .balloon-header {
    display: flex;
    cursor:move;
    background-color: #999;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  .balloon-header h3 {
    margin: 0;
  }
  .balloon-header .close-btn {
    cursor: pointer;
  }
  .balloon label {
    display: block;
    margin-bottom: 5px;
  }
  .balloon input[type="text"] {
    width: 100%;
    background-color: white;
    border: 1px solid;
    color:black;
  }
  .balloon button {
    margin-right: 5px;
  }
  .balloon hr {
    margin: 10px 0;
    border: none;
    border-top: 1px solid #ccc;
  }
  .item {
    display: block;
    padding: 2px;
  }
  .filter {
    display: flex;
    width: 100%;
  }
  .filter-tab {
    justify-content: space-between;
    display: flex;
    width: 100%;
  }
  .newtab {
    display:flex;
    align-items: center;
    margin-bottom: auto;
  }
  .status-bar {
    height: 18px;
    background-color: #999;
    margin-top: 5px;
    font-size: 12px;
    padding-left: 5px;
    color: bisque;
  }
  #suggestionsList {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
  
  #suggestionsList li {
    padding: 4px;
    cursor: pointer;
    color: black;
  }

  #suggestionsList li.selected {
    background-color: whitesmoke;
  }
  #suggestionsList li:hover {
    background-color: #f5f5f5;
  }`
