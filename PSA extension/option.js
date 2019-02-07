console.log("on option");
$(document).ready(function () {
    displayTemplate();
    document.getElementById('submitBtn').addEventListener('click', function () {

        var json = jsonConstructor();
        console.log(json)
        storeJson(json);
    });

    function jsonConstructor() {
        var templateName = document.getElementById('templateName').value;
        var time = document.getElementById('time').value;
        var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        var template = {
            templateName: templateName,
            time: time,
            location: []
        };
        for (var i = 0; i < days.length; i++) {
            var temp = document.getElementById('select-' + days[i]);
            template.location.push(temp.options[temp.selectedIndex].value);
        }
        return JSON.stringify(template);
    }

    function storeJson(parameter) {

        localStorage.setItem(0, parameter)

    }
    function displayTemplate() {
        disp = document.getElementById("templatesSummary");
        disp.innerHTML = "<div><h2>" +  JSON.parse(localStorage.getItem(0)).templateName + "</h2><ul><button id='edit'>edit</button><button id='duplicate'>duplicate</button><button id='delete'>delete</button></ul></div><br>";
    }
});

