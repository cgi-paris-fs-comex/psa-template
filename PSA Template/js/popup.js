$(document).ready(function () {
    /* Display all templates */
    function displayBtn() {
        for (var key in localStorage) {
            if (Number.isInteger(parseInt(key))) {
                if (localStorage.getItem(key) != null) {
                    var options = JSON.parse(localStorage.getItem(key));
                    disp = document.getElementById('savedBtn');
                    var locationTab_morn = [];
                    var locationTab_after = [];
                    var cat = options.time[1].value;
                    var time = [];
                    if (options.projTime.length > 0) {
                        cat.push(projectTtitle.split('s')[0]);
                    }
                    getTimeByDay(time, options);
                    getLocations(locationTab_morn, locationTab_after, options);
                }
                /*disp.innerHTML += "<button class='btn-flat waves-effect waves-red' id='" + options.id
                    + "' title='" + timeName + time + "| " + locationMornName + locationTab_morn + "|" + locationAfterName + locationTab_after
                    + "|"+ activitiesName + cat + "'>" + options.templateName + "</button>";*/

                var data = {
                    id: options.id,
                    name: options.templateName
                }
                var template = $('#mustache-template').html();
                var html = Mustache.to_html(template, data);
                disp.innerHTML += html;
            }
        }
    };

    function getTimeByDay(time, json) {
        for (var j = 0; j < days.length; j++) {
            var day = 0;
            for (var i = 0; i < json.time[0].value.length; i++) {
                if(json.time[0].value[i][j] != ''){
                day += parseFloat(json.time[0].value[i][j]);
                }
            }
            for (var i = 0; i < json.projTime.length; i++) {
                if(json.projTime[i][j] != ''){
                    day += parseFloat(json.projTime[i][j]);
                }    
            }
            time.push(days[j] + ": " + day + " h");
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
    $('a').click(function (event) {
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