// File: background.js (Production Version 1.0)

const KEEPALIVE_ALARM_NAME = 'ariveKeepAlive';

// Fired when the extension is first installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(KEEPALIVE_ALARM_NAME, {
    periodInMinutes: 1
  });
});

// Fired when the alarm goes off.
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === KEEPALIVE_ALARM_NAME) {
    // Find all tabs on the myarive.com domain.
    chrome.tabs.query({ url: "*://*.myarive.com/*" }, (tabs) => {
      // If no tabs are found, do nothing.
      if (tabs.length === 0) {
        return;
      }
      
      // Inject the click script into each found tab.
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: performClickInTab
        }).catch(err => {
          // Silently fail or add minimal error logging if needed in the future.
          // For now, we will ignore errors like script failing to inject into a closing tab.
        });
      });
    });
  }
});

// This function is injected into the Arive web page to perform the click.
function performClickInTab() {
  const headerElement = document.querySelector('app-header');
  if (headerElement) {
    headerElement.click();
  }
}