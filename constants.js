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
  <div class="filter-tab">
    <div>
      <input type="text" id="filter" placeholder="Enter key value to filter">
      <ul id="suggestionsList" style="display: none;"></ul>
      </div>
      
    <div class="newtab"><input type="checkbox" id="newTab">
    <span class="toggle-text">New Tab</span></div>
    </div>
  <div class="status"></div>
</div>

</div>
<hr>
<div class="item">
    <input type="text" id="url" placeholder="https://">
    </div>
    <div class="item">
      <input type="text" id="name" placeholder="Enter the binding key value to save">
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
