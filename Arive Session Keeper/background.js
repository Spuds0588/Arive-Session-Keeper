// File: background.js

// Define a constant for our alarm name for consistency.
const KEEPALIVE_ALARM_NAME = 'ariveKeepAlive';

// Fired when the extension is first installed, updated, or Chrome is updated.
chrome.runtime.onInstalled.addListener(() => {
  // Create an alarm that will fire every 1 minute.
  // The 'periodInMinutes' property is a convenient way to set this.
  chrome.alarms.create(KEEPALIVE_ALARM_NAME, {
    periodInMinutes: 1
  });
  console.log('Arive Session Keeper alarm created.');
});

// Fired when the alarm that we created goes off.
chrome.alarms.onAlarm.addListener(async (alarm) => {
  // Check if this is our specific alarm.
  if (alarm.name === KEEPALIVE_ALARM_NAME) {
    // Find all tabs that are open on the myarive.com domain.
    chrome.tabs.query({ url: "*://*.myarive.com/*" }, (tabs) => {
      if (tabs.length === 0) {
        console.log('No Arive tabs found. Doing nothing.');
        return;
      }
      
      // Send a message to each found tab.
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: performClickInTab
        }).catch(err => console.error(`Failed to inject script into tab ${tab.id}:`, err));
      });

      console.log(`Sent keep-alive signal to ${tabs.length} Arive tab(s).`);
    });
  }
});

// This function will be injected and executed in the context of the web page.
function performClickInTab() {
  const headerElement = document.querySelector('app-header');
  if (headerElement) {
    headerElement.click();
    console.log('Arive Session Keeper: Clicked app-header.');
  } else {
    console.log('Arive Session Keeper: app-header element not found.');
  }
}