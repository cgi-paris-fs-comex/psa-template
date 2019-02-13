$(document).ready(function () {
    /* Display all templates */
    function displayBtn() {
        for (var key in localStorage) {
            if (key.length < 3) {
                if (localStorage.getItem(key) != null) {
                    var options = JSON.parse(localStorage.getItem(key));
                    disp = document.getElementById('savedBtn');
                    var locationTab_morn = [];
                    var locationTab_after = [];
                    var cat = [];
                    for (var i = 0; i < options.location_morn.length; i++) {
                        for (var j = 0; j < locations.length - 1; j++) {
                            if (options.location_morn[i] == locations[j].value) {
                                locationTab_morn.push(locations[j].label);
                            }
                            if (options.location_after[i] == locations[j].value) {
                                locationTab_after.push(locations[j].label);
                            }
                        }
                    }
                    for (var j = 0; j < options.time[1].value.length; j++) {
                        if (options.time[1].value[j].length > 1) {
                            for (var k = 0; k < options.time[1].value[j].length; k++) {
                                cat.push(categories[options.time[1].value[j][k] + 1]);
                            }
                        }
                        else {
                            cat.push(categories[options.time[1].value[j][0] + 1]);
                        }
                    }



                }
                disp.innerHTML += "<button id='" + options.id + "' title='time: h/day| location_morn:" + locationTab_morn + "|location_afer:" + locationTab_after + "|category:" + cat + "'>" + options.templateName + "</button>";

            }

        }
    }



    displayBtn();
    /* Send the templates informations to page.js */
    $('button').click(function (event) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            var options = JSON.parse(localStorage.getItem(event.target.id));
            tabs.forEach(function (tab) {
                console.log('sending message to ' + tab.id);
                chrome.tabs.sendMessage(tab.id, options, function () {
                    console.log('message sent to ' + tab.id);
                });
            });
        });
    });
});