/**
 * Global variables.
 */

// List of tabs that are being turned on
const tabOnList = [];

/**
 * Add tabs onUpdated event. This is fired when the user refreshes the page.
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // If URL does not start with https or http then do nothing
    if (tab.url.startsWith('https:') === false && tab.url.startsWith('http:') === false) return;

    // Set session key values, which are related to the tab (each tab has its own settings)
    const extraCssKey = 'extra_css_' + tabId;

    // Get the session key value for this tab
    const result = await chrome.storage.session.get([extraCssKey]);

    // If no settings then we do not need to do anything
    if (!result[extraCssKey]) return;

    // Set extra CSS setting
    const extraCss = result[extraCssKey];

    // If turned off
    if (extraCss === 'OFF') {
        // Remove extra CSS file
        await chrome.scripting.removeCSS({
            target: { tabId: tabId },
            files: [
                "extra.css"
            ]
        });
    }

    // If we want to add extra.css
    if (extraCss === 'ON') {
        // Get tab on index
        const tabOnIndex = tabOnList.indexOf(tabId);

        // It is possible that the addListener event is called multiple times. This could
        // create a problem where we endup adding the CSS file multiple times too. While we
        // are adding the CSS file, we want to stop this same event from adding another one (again).
        // This is why we are using a global variable for each tab, to stop that from happening.

        // If tab on index not found
        if (tabOnIndex === -1) {
            // Add this tab to the tab on list
            tabOnList.push(tabId);

            // Add the extra-copy CSS file (this helps stop flickering)
            await chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['extra-copy.css']
            });

            // Remove any extra CSS file, just in case it already exists
            await chrome.scripting.removeCSS({
                target: { tabId: tabId },
                files: [
                    "extra.css"
                ]
            });

            // Add the extra CSS file
            await chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['extra.css']
            });

            // Remove the extra-copy CSS file
            await chrome.scripting.removeCSS({
                target: { tabId: tabId },
                files: [
                    "extra-copy.css"
                ]
            });

            // Remove this from the tab on list
            tabOnList.splice(tabOnIndex, 1);
        }
    }

    // Make badge text
    let badge = '';
    if (extraCss === 'ON') badge = 'ON';

    // Set the badge text
    await chrome.action.setBadgeText({ tabId: tabId, text: badge });
    if (chrome.action.setBadgeTextColor) await chrome.action.setBadgeTextColor({ tabId: tabId, color: [84, 71, 0, 255] });
    await chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: [255, 215, 0, 255] });

    // If extra CSS is OFF
    if (extraCss === 'OFF') {
        // Set default
        await chrome.action.setIcon({
            tabId: tabId,
            path: {
                '16': '/images/default16.png',
                '32': '/images/default32.png',
                '48': '/images/default48.png',
                '128': '/images/default128.png'
            }
        });
    }

    // If extra CSS is ON
    if (extraCss === 'ON') {
        // Set active
        await chrome.action.setIcon({
            tabId: tabId,
            path: {
                '16': '/images/active16.png',
                '32': '/images/active32.png',
                '48': '/images/active48.png',
                '128': '/images/active128.png'
            }
        });
    }
});

/**
 * Add action on clicked event. This is fired when the user presses the extension icon.
 */
chrome.action.onClicked.addListener(async (tab) => {
    // Set session key values, which are related to the tab (each tab has its own settings)
    const extraCssKey = 'extra_css_' + tab.id;

    // Get the session key value for this tab
    const result = await chrome.storage.session.get([extraCssKey]);

    // Set default extra CSS setting
    let extraCss = '';

    // If settings
    if (result[extraCssKey]) {
        // Update the extra CSS setting
        extraCss = result[extraCssKey];
    }

    // Swap the ON/OFF setting
    if (extraCss === 'ON') extraCss = 'OFF'; else extraCss = 'ON'

    // Update session settings
    let sessionExtraCss = {};
    sessionExtraCss[extraCssKey] = extraCss;
    await chrome.storage.session.set(sessionExtraCss);

    // Remove extra CSS file
    await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [
            "extra.css"
        ]
    });

    // If we want to add extra.css
    if (extraCss === 'ON') {
        // Add the extra CSS file
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['extra.css']
        });
    }

    // Make badge text
    let badge = '';
    if (extraCss === 'ON') badge = 'ON';

    // Set the badge text
    await chrome.action.setBadgeText({ tabId: tab.id, text: badge });
    if (chrome.action.setBadgeTextColor) await chrome.action.setBadgeTextColor({ tabId: tab.id, color: [84, 71, 0, 255] });
    await chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: [255, 215, 0, 255] });

    // If extra CSS is OFF
    if (extraCss === 'OFF') {
        // Set default
        await chrome.action.setIcon({
            tabId: tab.id,
            path: {
                '16': '/images/default16.png',
                '32': '/images/default32.png',
                '48': '/images/default48.png',
                '128': '/images/default128.png'
            }
        });
    }

    // If extra CSS is ON
    if (extraCss === 'ON') {
        // Set active
        await chrome.action.setIcon({
            tabId: tab.id,
            path: {
                '16': '/images/active16.png',
                '32': '/images/active32.png',
                '48': '/images/active48.png',
                '128': '/images/active128.png'
            }
        });
    }
});
