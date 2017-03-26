function handleClick() {
  browser.tabs.create({
    "url": "/viz.html"
  });
}

browser.browserAction.onClicked.addListener(handleClick);