document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({ active: true, url: location });
            };
        })();
    }
});

$(document).ready(function () {
    function displayBtn() {
        for (var key in localStorage) {
            if (localStorage.getItem(key) != null) {
                var optionData = getStoredData(key);
                disp = document.getElementById('savedBtn');
                var locationTab = [];
                for(var i = 0; i< optionData.location.length;i++){
                    if(optionData.location[i] == "O"){
                        locationTab.push('CGI');
                    }
                    if(optionData.location[i] == "C"){
                        locationTab.push('Client');
                    }
                    if(optionData.location[i] == "T"){
                        locationTab.push('Teletravail');
                    }
                    if(optionData.location[i] == "NA"){
                        locationTab.push('N/A');
                    }
                }
                disp.innerHTML += "<button id='" + optionData.id + "' title='time: "+optionData.time+"h/day| location:"+locationTab+"'>" + optionData.templateName + "</button>";
            }
        }

    }
    displayBtn();
    $('button').click(function (event) {
        console.log('click !');
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(event.target.id);
                var optionData = getStoredData(event.target.id);
                tabs.forEach(function (tab) {
                    console.log('sending message to ' + tab.id);
                    chrome.tabs.sendMessage(tab.id, optionData, function () {
                        console.log('message sent to ' + tab.id);
                    });
                });
        });
    });

});

function getStoredData(key) {
    return JSON.parse(localStorage.getItem(key));
}