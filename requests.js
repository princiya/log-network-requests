var pattern = null;
var tabUrls = '';
var thirdPartyUrls = '';

function getHostname(url) {
	let urlArray = url.split('/');
	return urlArray[2];
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    pattern = getHostname(changeInfo.url);
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);

function logURL(requestDetails) {
  let url = requestDetails.url;
  if (pattern &&
  	/^http.*/.test(url) &&	 
  	!pattern.match(getHostname(url))) {
  		thirdPartyUrls = thirdPartyUrls + ' ' + url + '<br/><br/>';
  		document.getElementById("urls").innerHTML = '<h3>Loading 3rd party URLS </h3><br/>' + thirdPartyUrls;
  }
}

function listTabs() {
  getCurrentWindowTabs().then((tabs) => {
    for (let tab of tabs) {
    	tabUrls = tabUrls + ' ' + tab.url + '<br/><br/>';

    	browser.webRequest.onCompleted.addListener(
		  logURL,
		  {urls: [ "<all_urls>"]}
		);
    }
    //document.getElementById("tabs").innerHTML = '<h3>Loading Tab URLS </h3><br/>' + tabUrls;
  });
}

function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

document.addEventListener("DOMContentLoaded", listTabs);