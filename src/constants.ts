export const _BOX_ID = '__speed_bookmark_id';
export const _MODE_SHORTCUT = { CtrlX: 'CtrlX', CtrlShiftX: 'CtrlShiftX', CtrlShiftF: 'CtrlShiftF', CtrlShiftD: 'CtrlShiftD' };

export const URL_IFRAME = chrome.runtime.getURL('html/index.html');

export const _HTML_BOX = `
<div class="balloon-header">
      <h3>Speed Shortcut</h3>
      <span class="close-btn">&times;</span>
    </div>
    <iframe id='ifav' src='${URL_IFRAME}' style="border-width: 0px;width:100%"></iframe>
    <div class="status-bar"></div>
  `;

export const _STYLE_AS_STRING = `  
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
 `
