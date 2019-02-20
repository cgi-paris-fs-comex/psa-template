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
                    for(var i = 0; i<options.projTime.length; i++){
                        time.push(options.projTime[i]);
                        cat.push("projet");
                    }
                    for (var i = 0; i < options.location_morn.length; i++) {
                        for (var j = 0; j < locations.length; j++) {
                            if (options.location_morn[i] == locations[j].value) {
                                locationTab_morn.push(locations[j].label);
                            }
                            if (options.location_after[i] == locations[j].value) {
                                locationTab_after.push(locations[j].label);
                            }
                        }
                    }
                }
                console.log(options);
                disp.innerHTML += "<button class='btn-flat waves-effect waves-red' id='" + options.id + "' title='time:" + time + "h| location_morn:" + locationTab_morn + "|location_afer:" + locationTab_after + "|category:" + cat + "'>" + options.templateName + "</button>";
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