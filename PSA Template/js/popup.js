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
                    var time = options.time[0].value;
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
                    for (var j = 0; j < options.time[1].value.length; j++) {
                        for (var k = 0; k < options.time[1].value[j].length; k++) {
                            var a = 0;
                            for(var i = 0;i<cat.length;i++){
                                if(cat[i] == categories[options.time[1].value[j][k] + 1]){
                                    break;
                                }
                                else{
                                    a++
                                }
                            }
                            if(a == cat.length){
                                cat.push(categories[options.time[1].value[j][k] + 1]);
                            }
                        }
                    }
                }

                disp.innerHTML += "<button id='" + options.id + "' title='time: Sun:"+time[0]+"h Mon:"+time[1]+"h Tue:"+time[2]+"h Wed:"+time[3]+"h Thu:"+time[4]+"h Fri:"+time[5]+"h Sat:"+time[6]+"h| location_morn:" + locationTab_morn + "|location_afer:" + locationTab_after + "|category:" + cat + "'>" + options.templateName + "</button>";

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