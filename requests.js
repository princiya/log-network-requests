var pattern = null;

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
  		console.log(" Loading 3rd party: " + url);
  }
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: [ "<all_urls>"]}
);