console.log('background running');

chrome.browserAction.onClicked.addListener(submitted);
function submitted(tab){

    console.log(tab.id);

    let json = {
        time : "7"
    }
    console.log(json.time);

    chrome.tabs.sendMessage(tab.id,json);
}
    



