
if (chrome.action && chrome.action.onClicked) {
  chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "settings/index.html" });
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "createNewTab") {
    chrome.tabs.create({url:request.url});
  }

  if (request.action === 'getStorage') {
    chrome.storage.local.get(function(result) {
      // Send the storage data back to the content script or iframe
      sendResponse(result);
    });
    // Ensure asynchronous response
    return true;
  }

});
