# log-network-requests
Web extension to log network requests

This project is part of my outreachy application for Mozilla's [Lightbeam](https://wiki.mozilla.org/User:Ptheriault/Outreachy2017) project.

As a first step, I have created a web-extension to log network requests. Here's an example how to run this [web extension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension).

The web extension now logs only 3rd party network requests. Following logic has been used to filter 3rd party network requests:

* Get URL of current tab:

```
function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    pattern = getHostname(changeInfo.url);
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);
```

* Filter for network requests which do not match the tab's hostname:

```
function logURL(requestDetails) {
  let url = requestDetails.url;

  if (pattern &&
  	/^http.*/.test(url) &&	 
  	!pattern.match(getHostname(url))) {
  		console.log(" Loading 3rd party: " + url);
  }
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: [ "<all_urls>"]}
);
```
![third-party-request-only](https://cloud.githubusercontent.com/assets/8022693/24322800/652a54d4-116b-11e7-8998-3bfabc39861c.png)
