/*
This script adds an extra option when hitting the right click button on pages
outside the web-extension. This added option allows users to save the page as a
note so they can read it later.
*/

browser.contextMenus.create({
    id: "copy-link-to-clipboard",
    title: "Copy link to clipboard",
    contexts: ["link"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId === "copy-link-to-clipboard") {

        const text = "This is text: " + info.linkUrl;
        // Always HTML-escape external input to avoid XSS.
        const safeUrl = escapeHTML(info.linkUrl);
        const html = `This is HTML: <a href="${safeUrl}">${safeUrl}</a>`;
        const code = "rightClickNewNote(" +
            JSON.stringify(text) + "," +
            JSON.stringify(html) + ");";

        browser.tabs.executeScript({
            code: "typeof rightClickNewNote === 'function';",
        }).then((results) => {
            // The content script's last expression will be true if the function
            // has been defined. If this is not the case, then we need to run
            // clipboard-helper.js to define function copyToClipboard.
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    //I think the problem with saving is coming from this area.
                    //Try changing this to the rightClick notes.
                    //ALSO, try making a class just for saving to the database
                    //This will probably safer than having two Notes objects defined.
                    //OR, see if you can import the Note object definition.
                    file: "public/scripts/quicknote.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {

            console.error("Failed to create Note: " + error);
        });
    }
});

function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
