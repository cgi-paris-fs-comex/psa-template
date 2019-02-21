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
                    var cat = options.time[1].value;
                    var time = options.time[0].value;
                    if (options.projTime.length > 0) {
                        for (var i = 0; i < options.projTime.length; i++) {
                            time.push(options.projTime[i]);
                        }
                        cat.push(projectTtitle.split('s')[0]);
                    }
                    getLocations(locationTab_morn, locationTab_after, options);
                }
                disp.innerHTML += "<button class='btn-flat waves-effect waves-red' id='" + options.id
                    + "' title='time:" + time + "h| location_morn:" + locationTab_morn + "|location_afer:" + locationTab_after
                    + "|Activities:" + cat + "'>" + options.templateName + "</button>";
            }
        }
    };

    function getLocations(morning, afternoon, json) {
        for (var i = 0; i < json.location_morn.length; i++) {
            for (var j = 0; j < locations.length; j++) {
                if (json.location_morn[i] == locations[j].value) {
                    morning.push(locations[j].label);
                }
                if (json.location_after[i] == locations[j].value) {
                    afternoon.push(locations[j].label);
                }
            }
        }
    };
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