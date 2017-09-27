chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(tab.url == 'https://www.dospara.co.jp/5step/step.php') {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(){
  chrome.tabs.executeScript(null, {
    file: "execute.js"
  });
});
