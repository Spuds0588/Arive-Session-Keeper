# Arive Session Keeper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Link-blue)](https://# "Link to Chrome Web Store page will be added here upon approval")

A simple, lightweight, "install and forget" Chrome extension that prevents session timeouts on the Arive mortgage platform (`.myarive.com`).

## The Problem

Users of the Arive platform are frequently logged out due to an idle timer, often in as little as 15 minutes. This disrupts workflow, forces repeated logins, and can cause a loss of unsaved work. When monitoring multiple loans or pages simultaneously, a single timeout logs the user out of all open Arive tabs.

## The Solution

Arive Session Keeper runs silently in the background, simulating minor user activity in every open Arive tab. This simple action resets the platform's idle timer, keeping your session active indefinitely so you can stay focused.

## Features

*   🚀 **Zero Configuration:** Install it from the Chrome Web Store and it works instantly. No settings, no popups.
*   🔄 **Multi-Tab Support:** Keeps every open Arive tab alive, whether it's active, in the background, or in a minimized window.
*   💡 **Lightweight & Efficient:** Built with modern Manifest V3 standards, ensuring minimal impact on browser performance and battery life.
*   🔒 **Privacy-Focused:** The extension does not read, store, or transmit any user data. It only runs on the `.myarive.com` domain and is completely inactive on all other websites.

## Installation

### Method 1: Chrome Web Store (Recommended for most users)

Once approved, you can install the official version directly from the Chrome Web Store for automatic updates and security.

> **[Install from the Chrome Web Store](PLACEHOLDER_LINK_HERE)** *(Link will be active once published)*

### Method 2: Manual Installation (For developers)

If you prefer to install from the source code:

1.  Download or clone this repository: `git clone https://github.com/your-username/arive-session-keeper.git`
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** using the toggle in the top-right corner.
4.  Click the **Load unpacked** button.
5.  Select the project folder you just cloned. The extension is now active.

## How It Works

The extension's logic is straightforward and transparent:

1.  A **Service Worker** (`background.js`) runs in the background.
2.  Using the `chrome.alarms` API, it sets a reliable timer that triggers once every 60 seconds.
3.  When the timer fires, the extension queries for all open tabs matching the `*://*.myarive.com/*` URL pattern.
4.  For each tab found, it uses the `chrome.scripting` API to inject a simple function that programmatically clicks the non-interactive `<app-header>` element on the page.
5.  This click is registered as user activity by the Arive platform, successfully resetting the session timeout clock.

## Permissions Justification

This extension requires a few permissions to function, and it's important you know why:

*   `scripting`: Allows the extension to execute code (`performClickInTab`) on the Arive web page to simulate a click. This is the core mechanism for keeping the session alive.
*   `alarms`: Allows the extension to run the keep-alive function on a reliable 60-second schedule, even when the browser is inactive.
*   `host_permissions` (*://\*.myarive.com/\*): This is a crucial security feature that **restricts** the extension to run *only* on pages within the Arive domain. It has no permissions and does nothing on any other website you visit.

## Contributing

Contributions, bug reports, and feature suggestions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
