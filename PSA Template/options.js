console.log("on options");
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
        var category = document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].value;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        console.log(id)
        var template = {
            templateName: templateName,
            time: time,
            location: [],
            id: id,
            category: category
        };
        for (var i = 0; i < days.length; i++) {
            var temp = document.getElementById('select-' + days[i]);
            if (category == "proj" || category == "2" || category == "14" || category == "21" || category == "22" || category == "23" || category == "24" || category == "25" || category == "26" || category == "39" || category == "40" || category == "44" || category == "47" || category == "48") {
                template.location.push(temp.options[temp.selectedIndex].value);
            }
            else {
                template.location.push("NA");
            }
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
        var category = document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].value;
        if (templateName != '') {
            tempJson.templateName = templateName;
        }
        if (time != '') {
            tempJson.time = time;
        }
        if (category != 'none') {
            tempJson.category = category;
        }
        for (var i = 0; i < days.length; i++) {
            var temp = document.getElementById('select-' + days[i]).value;
            if (category != "1") {
                if (temp != "S") {
                    tempJson.location[i] = temp;
                }
            }
            else {
                tempJson.location[i] = "NA";
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