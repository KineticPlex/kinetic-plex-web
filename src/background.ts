console.log("KineticPlex worker active!");

chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.id && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_sign-language-ext" }).catch((error) => {
      console.error("Failed to open the interface:", error);
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'FETCH_API') {
    console.log("Background received request to:", message.url); 
    
    fetch(message.url, {
      method: message.method,
      headers: {
        'Content-Type': 'application/json',
        ...(message.headers || {})
      },
      body: message.body ? JSON.stringify(message.body) : undefined,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Successful Flask response:", data);
        sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.error("Error contacting Flask:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; 
  }
});