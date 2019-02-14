console.log("on options");
$(document).ready(function () {
    if (localStorage.length != 0) {
        displayTemplate();
    }
    var nbExtraProj = 0;
    function initProjectLines() {
        var i = 1;
        $('#projectLines').click(function () {
            nbExtraProj++;
            var lines = "<tr><td>Extra Project" + i + "</td>";
            for (var j = 0; j < 7; j++) {
                lines += "<td><input type='text' id='P" + i + "D" + (j + 1) + "'></td>";
            }
            i++;
            lines += "</tr>";
            $("#tabLines")[0].innerHTML += lines;
        });
    }
    /*function that initialize the table */
    function initCatTable() {
        var table = "<tr><th></th>";
        for (var i = 0; i < days.length; i++) {
            table += "<th>" + days[i] + "</th>";
        }
        table += "</tr>";
        for (var i = 0; i < categories.length; i++) {
            table += "<tr><td>" + categories[i] + "</td>";
            for (var j = 0; j < 7; j++) {
                table += "<td><input type='text' id='C" + (i - 1) + "D" + (j + 1) + "'></td>";
            }
            table += "</tr>";
        }
        $('#categoryTable')[0].innerHTML = table;
    }

    /*initialise location table */
    function intitLocation() {
        var table = "<tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<th>" + days[i] + "</th>";
        }
        table += "</tr><tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<td> <select id='select-" + days[i] + "-morning'>";
            for (var j = 0; j < locations.length - 1; j++) {
                table += "<option value='" + locations[j].value + "'>" + locations[j].label + "</option>";
            }
            table += "<option selected value='" + locations[3].value + "'>" + locations[3].label + "</option></select></td>";
        }
        table += "</tr><tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<td> <select id='select-" + days[i] + "-afternoon'>";
            for (var j = 0; j < locations.length - 1; j++) {
                table += "<option value='" + locations[j].value + "'>" + locations[j].label + "</option>";
            }
            table += "<option selected value='" + locations[3].value + "'>" + locations[3].label + "</option></select></td>";
        }
        table += "</tr>";
        $('#locationTable')[0].innerHTML = table;
    }
    initCatTable();
    initProjectLines();
    intitLocation();

    /* Save the template */
    $('#submitBtn').click(function () {
        var json = jsonConstructor();
        storeJson(json);
        location.reload();
    });
    /* Create the JSON with all templates informations */
    function jsonConstructor() {
        var templateName = $('#templateName')[0].value;
        var id = 0;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        var template = {
            templateName: templateName,
            time: [
                { name: 'tabTime', value: [] },
                { name: 'tabCat', value: [] }
            ],
            extraProjTime: [],
            location_morn: [],
            location_after: [],
            id: id,
        };
        for (var i = 0; i < days.length; i++) {
            var interTab = [];
            var interTabCat = [];
            var extraLine = []
            if (nbExtraProj > 0) {
                for (var j = 1; j <= nbExtraProj; j++) {
                    extraLine.push($("#P" + j + "D" + (i + 1))[0].value);
                }
                template.extraProjTime.push(extraLine);
            }
            for (var j = (-1); j < categories.length - 1; j++) {
                var k = i + 1;
                var l = j;
                if ($("#C" + j + "D" + k)[0].value != '') {
                    interTab.push($("#C" + j + "D" + k)[0].value);
                    interTabCat.push(l);
                    l = j - 1;
                }
            }
            template.time[0].value.push(interTab);
            template.time[1].value.push(interTabCat);
            var temp_morn = $('#select-' + days[i] + '-morning')[0];
            var temp_after = $('#select-' + days[i] + '-afternoon')[0];
            template.location_morn.push(temp_morn.options[temp_morn.selectedIndex].value);
            template.location_after.push(temp_after.options[temp_after.selectedIndex].value);
        }
        return JSON.stringify(template);
    }
    /* Store the JSON in LocalStorage to keep it saved inside the extension */
    function storeJson(parameter) {
        localStorage.setItem(JSON.parse(parameter).id, parameter)
    }
    /* Display templates in option */
    function displayTemplate() {
        for (var key in localStorage) {
            if (localStorage.getItem(key) != null) {
                disp = $('#templatesSummary')[0];
                disp.innerHTML += "<tr><h2>" + JSON.parse(localStorage.getItem(key)).templateName + "</h2><ul><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='edit'>edit</button><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='duplicate'>duplicate</button><button value='" + JSON.parse(localStorage.getItem(key)).id + "' id='delete'>delete</button></ul></tr>";
            }
        }
    }
    /* Run fuction after a click of an edit/delete/duplicate button */
    $('button').click(function (event) {
        if (event.target.id == 'delete') {
            localStorage.removeItem(event.target.value); //Delete function
            location.reload();
        }
        if (event.target.id == 'edit') {
            $('#edit-btn')[0].innerHTML = "<button  id='edit2'>Save</button>"
            editItem(event.target.value);
        }
        if (event.target.id == "duplicate") {
            duplicateItem(event.target.value);
            location.reload();
        }
    });
    /* Edit to modify a template */
    function editItem(param) {
        var tempJson = JSON.parse(localStorage.getItem(param));
        $('#templateName')[0].value = tempJson.templateName;
        if (tempJson.extraProjTime.length > 0) {
            var max = 0;
            for (var i = 0; i < tempJson.extraProjTime.length - 1; i++) {
                if (tempJson.extraProjTime[i].length < tempJson.extraProjTime[i + 1].length) {
                    max = tempJson.extraProjTime[i + 1].length;
                }
                else {
                    max = tempJson.extraProjTime[i].length;
                }
            }
            for (var i = 0; i < max; i++) {
                $('#projectLines').trigger('click');
            }
            for (var i = 0; i < tempJson.extraProjTime.length; i++) {
                for (var j = 0; j < tempJson.extraProjTime[i].length; j++) {
                    $("#P" + (j + 1) + "D" + (i + 1))[0].value = tempJson.extraProjTime[i][j];
                }
            }
        }
        for (var i = 0; i < days.length; i++) {
            for (var j = 0; j < categories.length; j++) {
                if (tempJson.time[0].value[i][j - 1] != undefined) {
                    for (var l = 0; l < tempJson.time[1].value[i].length; l++) {
                        $("#C" + tempJson.time[1].value[i][l] + "D" + (i + 1))[0].value = tempJson.time[0].value[i][l];
                    }
                }
            }
            var temp_morn = $('#select-' + days[i] + '-morning')[0];
            var temp_after = $('#select-' + days[i] + '-afternoon')[0];
            temp_morn.value = tempJson.location_morn[i];
            temp_after.value = tempJson.location_after[i];
        }
        $('#edit2').click(function () {
            var templateName = $('#templateName')[0].value;
            tempJson.templateName = templateName;
            for (var i = 0; i < days.length; i++) {
                var interTab = [];
                var interTabCat = [];
                var extraLine = []
                if (nbExtraProj > 0) {
                    for (var j = 1; j <= nbExtraProj; j++) {
                        extraLine.push($("#P" + j + "D" + (i + 1))[0].value);
                    }
                    tempJson.extraProjTime[i] = extraLine;
                }
                for (var j = (-1); j < categories.length - 1; j++) {
                    var k = i + 1;
                    var l = j;
                    if ($("#C" + j + "D" + k)[0].value != '') {
                        interTab.push($("#C" + j + "D" + k)[0].value);
                        interTabCat.push(l);
                        l = j - 1;
                    }
                }
                tempJson.time[0].value[i] = interTab;
                tempJson.time[1].value[i] = interTabCat;
                var temp_morn = $('#select-' + days[i] + '-morning')[0].value;
                var temp_after = $('#select-' + days[i] + '-afternoon')[0].value;
                tempJson.location_morn[i] = temp_morn;
                tempJson.location_after[i] = temp_after;
                localStorage.setItem(tempJson.id, JSON.stringify(tempJson));
            }
            location.reload();
        });
    }
    /* Duplicate the template */
    function duplicateItem(param) {
        var tempJ = JSON.parse(localStorage.getItem(param));
        tempJ.templateName = tempJ.templateName + "-copy";
        id = 0;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        tempJ.id = id;
        storeJson(JSON.stringify(tempJ));

    }
});