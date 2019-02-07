console.log("on option");
$(document).ready(function () {
    if (localStorage.length != 0) {
        displayTemplate();
    }

    document.getElementById('submitBtn').addEventListener('click', function () {

        var json = jsonConstructor();
        console.log(json)
        storeJson(json);
        location.reload();
    });
    var lastid;
    function jsonConstructor() {
        var templateName = document.getElementById('templateName').value;
        var id = 0;
        var time = document.getElementById('time').value;
        var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        while (localStorage.getItem(id) != null) {
            id++;
        }
        console.log(id)
        var template = {
            templateName: templateName,
            time: time,
            location: [],
            id: id
        };
        for (var i = 0; i < days.length; i++) {
            var temp = document.getElementById('select-' + days[i]);
            template.location.push(temp.options[temp.selectedIndex].value);
        }
        return JSON.stringify(template);
    }

    function storeJson(parameter) {

        localStorage.setItem(JSON.parse(parameter).id, parameter)
        lastid = JSON.parse(parameter).id;
        console.log(lastid);
    }
    function displayTemplate() {

        for (var key in localStorage) {

            if (localStorage.getItem(key) != null) {
                disp = document.getElementById("templatesSummary");
                disp.innerHTML += "<div><h2>" + JSON.parse(localStorage.getItem(key)).templateName + "</h2><ul><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='edit'>edit</button><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='duplicate'>duplicate</button><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='delete'>delete</button></ul></div><br>";
            }
        }

    }
    $('button').click(function (event) {
        if (event.target.id == 'delete') {
            delItem(event.target.value);
        }
        if (event.target.id == 'edit') {
            editItem(event.target.value);
        }
        if (event.target.id == "duplicate") {
            duplicateItem(event.target.value);
        }
        location.reload();
    });

    function delItem(param) {
        localStorage.removeItem(param);
    }

    function editItem(param) {
        var templateName = document.getElementById('templateName').value;
        var time = document.getElementById('time').value;
        var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        var tempJson = JSON.parse(localStorage.getItem(param));
        if (templateName != '') {
            tempJson.templateName = templateName;
        }
        if (time != '') {
            tempJson.time = time;
        }
        for (var i = 0; i < days.length; i++) {
            var temp = document.getElementById('select-' + days[i]).value;
            if (temp != "S") {
                tempJson.location[i] = temp;
            }
        }
        localStorage.setItem(tempJson.id, JSON.stringify(tempJson));
    }


    function duplicateItem(param) {
        var tempJ = JSON.parse(localStorage.getItem(param));
        id = 0;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        tempJ.id = id;
        storeJson(JSON.stringify(tempJ));

    }
});