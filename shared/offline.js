/* Compatibility URL for old bookmarks. Learning now uses normal online files. */
(() => { location.replace(new URL('../index.html', document.currentScript.src).href); })();
