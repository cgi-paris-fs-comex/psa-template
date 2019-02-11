$(document).ready(function () {
    function displayBtn() {
        for (var key in localStorage) {
            if (localStorage.getItem(key) != null) {
                var optionData = getStoredData(key);
                disp = document.getElementById('savedBtn');
                var locationTab = [];
                var cat;
                for (var i = 0; i < optionData.location.length; i++) {
                    switch (optionData.location[i]) {
                        case "O":
                            locationTab.push('CGI');
                            break;
                        case "C":
                            locationTab.push('Client');
                            break;
                        case "T":
                            locationTab.push('Teletravail');
                            break;
                        case "NA":
                            locationTab.push('N/A');
                            break;
                    }
                }
                switch (optionData.category) {
                    case 'proj':
                        cat = 'project';
                        break;
                    case '1':
                        cat = 'conge';
                        break;
                    case '21':
                        cat = 'travaux passagers';
                        break;
                    case '25':
                        cat = 'formation'
                        break;
                }
                disp.innerHTML += "<button id='" + optionData.id + "' title='time: " + optionData.time + "h/day| location:" + locationTab + "|category:" + cat + "'>" + optionData.templateName + "</button>";
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