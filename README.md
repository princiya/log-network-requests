# log-network-requests
Web extension to log network requests

This project is part of my outreachy application for Mozilla's [Lightbeam](https://wiki.mozilla.org/User:Ptheriault/Outreachy2017) project.

---
#### Commit 1
As a first step, I have created a web-extension to log network requests. Here's an example how to run this [web extension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension).

---
#### Commit 2
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

---
#### Commit 3
The web extension now loads a html page in a new tab and logs third party network requests there.

![third-party-requests](https://cloud.githubusercontent.com/assets/8022693/24329774/9d2135c4-1210-11e7-85d2-978cf36ec453.gif)

---
#### Commit 4
Logging unique third party hostnames:

```
function logURL(requestDetails) {
  let url = requestDetails.url;
  if (pattern &&
  	/^http.*/.test(url) &&	 
  		!pattern.match(getHostname(url))) {
  			let uniqueUrl = getHostname(url);
  			if (thirdPartyUrls.indexOf(uniqueUrl) === -1) {
  				thirdPartyUrls.push(uniqueUrl);
  			}
  }
  document.getElementById("urls").innerHTML = thirdPartyUrls;
}
```

---
#### Commit 5
Visualising third party network requests using D3.js

![google-viz](https://cloud.githubusercontent.com/assets/8022693/24334403/d03ae0b4-1269-11e7-8f2d-1ccd968df7b3.png)

![yahoo-viz](https://cloud.githubusercontent.com/assets/8022693/24334405/d6d57182-1269-11e7-8e6d-96f683e799a0.png)

![filmy-viz](https://cloud.githubusercontent.com/assets/8022693/24334411/de1fb7e0-1269-11e7-9a67-c2bbdd466093.png)

Here's a [video](http://recordit.co/JE4amF5xmt) of the visualisations

---

Visualisation ideas are discussed [here](https://github.com/princiya/log-network-requests/issues/2)
