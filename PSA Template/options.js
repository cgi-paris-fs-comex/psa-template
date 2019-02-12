console.log("on options");
$(document).ready(function () {
    if (localStorage.length != 0) {
        displayTemplate();
    }
    document.getElementById('select-category').addEventListener('change', function () {
        var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        var category = document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].value;
        for (var i = 0; i < days.length; i++) {
            var temp_m = document.getElementById('select-' + days[i] + '-m');
            var temp_a = document.getElementById('select-' + days[i] + '-a');
            if (category == "proj" || category == "2" || category == "14" || category == "21" || category == "22" || category == "23" || category == "24" || category == "25" || category == "26" || category == "39" || category == "40" || category == "44" || category == "47" || category == "48") {
                temp_m.value = "S";
                temp_a.value = "S";
            }
            else {
                temp_m.value = "NA";
                temp_a.value = "NA";
            }
        }
    });
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
        var category = document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].value;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        console.log(id)
        var template = {
            templateName: templateName,
            time: time,
            location_m: [],
            location_a: [],
            id: id,
            category: category
        };
        for (var i = 0; i < days.length; i++) {
            var temp_m = document.getElementById('select-' + days[i] + '-m');
            var temp_a = document.getElementById('select-' + days[i] + '-a');
            template.location_m.push(temp_m.options[temp_m.selectedIndex].value);
            template.location_a.push(temp_a.options[temp_a.selectedIndex].value);
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
            location.reload();
        }
        if (event.target.id == 'edit') {
            document.getElementById("edit-btn").innerHTML = "<button id='edit2'>Save</button>"
            editItem(event.target.value);
        }
        if (event.target.id == "duplicate") {
            duplicateItem(event.target.value);
            location.reload();
        }
    });

    function delItem(param) {
        localStorage.removeItem(param);
    }

    function editItem(param) {
        var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        var tempJson = JSON.parse(localStorage.getItem(param));
        document.getElementById('templateName').value = tempJson.templateName;
        document.getElementById('time').value = tempJson.time;
        document.getElementById('select-category').value = tempJson.category;
        for (var i = 0; i < days.length; i++) {
            var temp_m = document.getElementById('select-' + days[i] + '-m');
            var temp_a = document.getElementById('select-' + days[i] + '-a');
            temp_m.value = tempJson.location_m[i];
            temp_a.value = tempJson.location_a[i];
        }

        document.getElementById("edit2").addEventListener('click', function () {

            var templateName = document.getElementById('templateName').value;
            var time = document.getElementById('time').value;
            var category = document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].value;
            tempJson.templateName = templateName;
            tempJson.time = time;
            tempJson.category = category;
            for (var i = 0; i < days.length; i++) {
                var temp_m = document.getElementById('select-' + days[i] + '-m').value;
                var temp_a = document.getElementById('select-' + days[i] + '-a').value;
                tempJson.location_m[i] = temp_m;
                tempJson.location_a[i] = temp_a;
                localStorage.setItem(tempJson.id, JSON.stringify(tempJson));
            }
            location.reload();
        });
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