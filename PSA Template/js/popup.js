$(document).ready(function () {
    /* Display all templates */
    function displayBtn() {
        for (var key in localStorage) {
            if (localStorage.getItem(key) != null) {
                var options = JSON.parse(localStorage.getItem(key));
                disp = document.getElementById('savedBtn');
                var locationTab_morn = [];
                var locationTab_after = [];
                var cat;
                for (var i = 0; i < options.location_morn.length; i++) {
                    for (var j = 0; j < locations.length - 1; j++) {
                        if (options.location_morn[i] == locations[j + 1].value) {
                            locationTab_morn.push(locations[j + 1].label);
                        }
                        if (options.location_after[i] == locations[j + 1].value) {
                            locationTab_after.push(locations[j + 1].label);
                        }
                    }
                }

                for (var i = 0; i < categories.length; i++) {
                    if (options.category == "proj") {
                        cat = categories[1];
                    }
                    if (options.category == i - 2) {
                        cat = categories[i]
                    }
                }
                disp.innerHTML += "<button id='" + options.id + "' title='time: " + options.time + "h/day| location_morn:" + locationTab_morn + "|location_afer:" + locationTab_after + "|category:" + cat + "'>" + options.templateName + "</button>";
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
