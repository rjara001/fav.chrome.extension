const NAME_EXTENSION = 'Speed Bookmark';
const _BOX_ID = '__speed_bookmark_id';
const _MODE_SHORTCUT = { CtrlX: 'CtrlX', CtrlShiftX: 'CtrlShiftX', CtrlShiftF: 'CtrlShiftF', CtrlShiftD: 'CtrlShiftD' };

const _HTML_BOX = `
<div class="balloon-header">
      <h3>Speed Shortcut</h3>
      <span class="close-btn">&times;</span>
    </div>
<div class="item">
<div class="filter">
  <input type="text" id="filter" placeholder="Enter filter">
</div>
<ul id="suggestionsList" style="display: none;"></ul>
</div>
<hr>
<div class="item">
    <input type="text" id="url" placeholder="https://">
    </div>
    <div class="item">
      <input type="text" id="name" placeholder="Enter name">
    </div>
    <button id="save">Save</button>
  `;

const _STYLE_AS_STRING = `.balloon {
    position: fixed;
    padding: 4px;
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
  .balloon input {
    width: 100%;
    margin-bottom: 10px;
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
    display: flex;
  }
  .filter {
    display: block;
  }
    
  #suggestionsList {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    top: 20px;
    left: -146px;
  }
  
  #suggestionsList li {
    padding: 4px;
    cursor: pointer;
    color: black;
  }
  
  #suggestionsList li:hover {
    background-color: #f5f5f5;
  }`