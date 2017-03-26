var pattern = null;
var thirdPartyUrls = [];

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
  			let uniqueUrl = getHostname(url);
  			if (thirdPartyUrls.indexOf(uniqueUrl) === -1) {
  				thirdPartyUrls.push(uniqueUrl);
  			}
  }
  document.getElementById("urls").innerHTML = thirdPartyUrls;
}

browser.webRequest.onCompleted.addListener(
  logURL,
  {urls: [ "<all_urls>"]}
);

function getThirdPartyUrls() {
	return thirdPartyUrls;
}