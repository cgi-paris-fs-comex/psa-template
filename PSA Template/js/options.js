console.log("on options");
$(document).ready(function () {
    saveLang();
    if (localStorage.length != 0) {
        $('select').formSelect();
        displayTemplate();
    }
    var catl = 0;
    var projl = 0;
    function addProject(line) {
        var proj = "<div id='proj" + line + "' class='row'><div  class='col s2 input-field'><input type='text' class='validate' disabled value='"+ projectTtitle.split('s')[0]+" "+ line + "'></div>";
        for (var i = 1; i < days.length + 1; i++) {
            proj += "<div class='col s1 input-field'><input type='text' id='P" + line + "D" + i + "'><label class='active' for='P" + line + "D" + i + "'>" + days[i - 1] + "</label></div>";
        }
        proj += "<div class='col s3 input-field'><button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text red lighten-1 btn material-icons' id='delete_" + line + "'>delete</button>"
            + "<button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text lighten-1 btn material-icons' id='duplicate_" + line + "'>filter_none</button></div></div>";
        $('#projectForm')[0].innerHTML += proj;
        projl++;
    };

    function addProjectToOthers() {
        temp = [];
        for (var i = 0; i < projl; i++) {
            temp.push([]);
            for (var j = 0; j < 7; j++) {
                temp[i].push($("#P" + i + "D" + (j + 1))[0].value);
            }
        }
        addProject(projl)
        for (var i = 0; i < projl - 1; i++) {
            for (var j = 0; j < 7; j++) {
                $("#P" + i + "D" + (j + 1))[0].value = temp[i][j];
            }
        }
    };

    function addCategory(line, activitieChoice) {
        var cat = "<div id = 'cat" + line + "' class='row'><div class='col s2 input-field'><select id='select" + line + "'><option id='choice' value='' disabled selected>"+activitieChoice+"</option>";
        for (var i = 0; i < categories.length; i++) {
            cat += "<option value='" + categories[i] + "'>" + categories[i] + "</option>";
        }
        cat += "</select></div>";
        for (var i = 1; i < days.length + 1; i++) {
            cat += "<div class='col s1 input-field'><input type='text' id='C" + line + "D" + i + "'><label class='active' for='C" + line + "D" + i + "'>" + days[i - 1] + "</label></div>";
        }
        cat += "<div  class='col s3 input-field'><button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text red lighten-1 btn material-icons' id='deleteCat" + line + "'>delete</button>"
            + "<button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text lighten-1 btn material-icons' id='duplicateCat" + line + "'>filter_none</button>";
        $('#categoriesForm')[0].innerHTML += cat;
        catl++;
    };

    function addCategoryToOthers() {
        temp = [];
        temp2 = [];
        for (var i = 0; i < catl; i++) {
            temp.push([]);
            for (var j = 0; j < 7; j++) {
                temp[i].push($("#C" + i + "D" + (j + 1))[0].value);
            }
            temp2.push($("#select" + i)[0].value);
        }
        addCategory(catl,optionActivite)
        for (var i = 0; i < catl - 1; i++) {
            for (var j = 0; j < 7; j++) {
                $("#C" + i + "D" + (j + 1))[0].value = temp[i][j];
            }
            $("#select" + i)[0].value = temp2[i];
        }
    };

    $('#popbtn').click(function () {
        $('.modal').modal({
            dismissible: false
        });
        var project = projectTtitle.toString();
        var activites = activititesTitle.toString();
        $('#projectTitle')[0].innerHTML = project;
        $('#activitesTitle')[0].innerHTML = activites;
        $('#templateName')[0].placeholder = templatePlaceholder;
        $('#closeBtn')[0].innerHTML = cancelBtn;
        $('#addProjectBtn').click(function () {
            if (projl == 0) {
                addProject(projl);
            }
            else {
                addProjectToOthers();
            }
            $('button[id^="duplicate_"]').click(function (event) {
                duplicateLine("duplicate_", event);
            });
            $('button[id^="delete_"]').click(function (event) {
                deleteLine("delete_", "proj", event);
            });
        });
        $('#addCategoriesBtn').click(function () {
            $('select').formSelect('destroy');
            if (catl == 0) {
                addCategory(catl,optionActivite);
            }
            else {
                addCategoryToOthers();
            }
            $('button[id^=deleteCat]').click(function (event) {
                deleteLine("deleteCat", "cat", event);
            });
            $('button[id^=duplicateCat]').click(function (event) {
                duplicateLine("duplicateCat", event);
            });
            $('select').formSelect();
        });
        $('#saveBtn').click(function () {
            var json = jsonConstructor();
            storeJson(json);
            location.reload();
        });
        $('#closeBtn').click(function () {
            location.reload();
        });
        $('select').formSelect();
    });

    function deleteLine(id, divId, event) {
        if (id == "delete_") {
            for (var i = 0; i < projl; i++) {
                if (event.target.id == id + i) {
                    middleDelProj(i, divId);
                    projl--;
                }
            }
        }
        if (id == "deleteCat") {
            for (var i = 0; i < catl; i++) {
                if (event.target.id == id + i) {
                    middleDelCat(i, divId);
                    catl--;
                }
            }
        }
    };

    function middleDelProj(boucle, div) {
        if (projl > 1) {
            if (boucle != (projl - 1)) {
                for (var l = boucle; l < projl - 1; l++) {
                    for (var k = 1; k < days.length; k++) {
                        $("#P" + l + "D" + k)[0].value = $("#P" + (l + 1) + "D" + k)[0].value;
                    }
                }
            }
            $("#" + (div + (projl - 1)))[0].remove();
        }
        else {

            $("#" + (div + boucle))[0].remove();
        }
    };

    function middleDelCat(boucle, div) {
        if (catl > 1) {
            if (boucle != (catl - 1)) {
                for (var l = boucle; l < catl - 1; l++) {
                    for (var k = 1; k < days.length; k++) {
                        $("#C" + l + "D" + k)[0].value = $("#C" + (l + 1) + "D" + k)[0].value;
                    }
                    $('select').formSelect('destroy');
                    $("#select" + l)[0].value = $("#select" + (l + 1))[0].value;
                    $('select').formSelect();
                }
            }
            $("#" + (div + (catl - 1)))[0].remove();
        }
        else {
            $("#" + (div + boucle))[0].remove();
        }
    };

    function duplicateLine(id) {
        if (id == "duplicate_") {
            $('#addProjectBtn').trigger('click');
            for (var i = 0; i < projl - 1; i++) {
                if (event.target.id == id + i) {
                    for (var j = 1; j < 8; j++) {
                        $("#P" + (projl - 1) + "D" + j)[0].value = $("#P" + i + "D" + j)[0].value;
                    }
                }
            }
        }
        if (id == "duplicateCat") {
            $('#addCategoriesBtn').trigger('click');
            $('select').formSelect('destroy');
            for (var i = 0; i < catl - 1; i++) {
                if (event.target.id == id + i) {
                    for (var j = 1; j < 8; j++) {
                        $("#C" + (catl - 1) + "D" + j)[0].value = $("#C" + i + "D" + j)[0].value;
                        $("#select" + (catl - 1))[0].value = $("#select" + i)[0].value;
                    }
                }
            }
            $('select').formSelect();
        }
    };

    function intitLocation() {
        var table = "<tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<th>" + days[i] + "</th>";
        }
        table += "</tr><tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<td> <div class='input-field col s12'> <select id='select-" + days[i] + "-morning'>";
            for (var j = 0; j < locations.length - 1; j++) {
                table += "<option value='" + locations[j].value + "'>" + locations[j].label + "</option>";
            }
            table += "<option selected value='" + locations[3].value + "'>" + locations[3].label + "</option></select></div></td>";
        }
        table += "</tr><tr>";
        for (var i = 0; i < days.length; i++) {
            table += "<td> <div class='input-field col s12'> <select id='select-" + days[i] + "-afternoon'>";
            for (var j = 0; j < locations.length - 1; j++) {
                table += "<option value='" + locations[j].value + "'>" + locations[j].label + "</option>";
            }
            table += "<option selected value='" + locations[3].value + "'>" + locations[3].label + "</option></select></div></td>";
        }
        table += "</tr>";
        $('#locationTable')[0].innerHTML = table;
    };
    intitLocation();
    $('.fixed-action-btn').floatingActionButton();
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
            projTime: [],
            location_morn: [],
            location_after: [],
            id: id,
        };
        createProjectTime(template.projTime);
        createCatTime(template.time[0].value, template.time[1].value);
        createLocationTime(template.location_morn, template.location_after)
        return JSON.stringify(template);
    };

    function createLocationTime(morning, afternoon) {
        for (var i = 0; i < days.length; i++) {
            var temp_morn = $('#select-' + days[i] + '-morning')[0];
            var temp_after = $('#select-' + days[i] + '-afternoon')[0];
            morning.push(temp_morn.options[temp_morn.selectedIndex].value);
            afternoon.push(temp_after.options[temp_after.selectedIndex].value);
        }
    };

    function createCatTime(catTime, catName) {
        if (catl > 0) {
            for (var j = 0; j < catl; j++) {
                var CatTab = [];
                for (var i = 1; i <= days.length; i++) {
                    CatTab.push($("#C" + j + "D" + i)[0].value);
                }
                var temp = $("#select" + j)[0];
                catName.push(temp.options[temp.selectedIndex].value);
                catTime.push(CatTab);
            }
        }
    };

    function createProjectTime(projectTab) {
        if (projl > 0) {
            for (var j = 0; j < projl; j++) {
                var projLine = [];
                for (var i = 1; i <= days.length; i++) {
                    projLine.push($("#P" + j + "D" + i)[0].value);
                }
                projectTab.push(projLine);
            }
        }
    };

    function storeJson(parameter) {
        localStorage.setItem(JSON.parse(parameter).id, parameter);
    };

    function displayTemplate() {
        var disp;
        for (var key in localStorage) {
            if ((localStorage.getItem(key) != null) && (key != 'lang')) {
                var getId = JSON.parse(localStorage.getItem(key)).id;
                disp = "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>" + JSON.parse(localStorage.getItem(key)).templateName
                    + "</span><p>Template for PSA Time</p></div>"
                    + "<div class='card-action'>"
                    + "<button class='btn-flat orange-text material-icons' value='" + getId + "' id='edit'>edit</button>"
                    + "<button class='btn-flat orange-text material-icons' value='" + getId + "' id='delete'>delete</button>"
                    + "<button class='btn-flat orange-text material-icons' value='" + getId + "' id='duplicate'>filter_none</button></div></div></div>";
                $('#templatesBody')[0].innerHTML += disp;
            }
        }
    };

    $('button').click(function (event) {
        if (event.target.id == 'delete') {
            localStorage.removeItem(event.target.value);
            location.reload();
        }
        if (event.target.id == 'edit') {
            $('.modal-footer')[0].innerHTML = "<button class='modal-close waves-effect waves-green btn green' id='saveBtn2'>OK</button>"
                + "<button class='modal-close waves-effect waves-red btn red' id='closeBtn'>Cancel</button>"
            editItem(event.target.value);
        }
        if (event.target.id == "duplicate") {
            duplicateItem(event.target.value);
            location.reload();
        }
    });

    function displayCategories(json) {
        if (json.time[0].value.length > 0) {
            for (var i = 0; i < json.time[0].value.length; i++) {
                addCategory(i,optionActivite);
            }
            for (var i = 0; i < json.time[0].value.length; i++) {
                $('select').formSelect();
                var temp = $("#select" + i)[0];
                temp.value = json.time[1].value[i];
                for (var j = 0; j < json.time[0].value[i].length; j++) {
                    $("#C" + i + "D" + (j + 1))[0].value = json.time[0].value[i][j];
                }
            }
        }
    };

    function displayProject(json) {
        if (json.projTime.length > 0) {
            for (var i = 0; i < json.projTime.length; i++) {
                addProject(i)
            }
            for (var i = 0; i < json.projTime.length; i++) {
                for (var j = 0; j < json.projTime[i].length; j++) {
                    $("#P" + i + "D" + (j + 1))[0].value = json.projTime[i][j];
                }
            }
        }
    };

    function displayLocations(json) {
        for (var i = 0; i < days.length; i++) {
            var temp_morn = $('#select-' + days[i] + '-morning')[0];
            var temp_after = $('#select-' + days[i] + '-afternoon')[0];
            temp_morn.value = json.location_morn[i];
            temp_after.value = json.location_after[i];
            $('select').formSelect();
        }
    };

    function editCatTime(catTime, catName) {
        if (catl > 0) {
            for (var j = 0; j < catl; j++) {
                var CatTab = [];
                for (var i = 1; i <= days.length; i++) {
                    CatTab.push($("#C" + j + "D" + i)[0].value);
                }
                var temp = $("#select" + j)[0];
                catName[j] = temp.options[temp.selectedIndex].value;
                catTime[j] = CatTab;
            }
        }
    };

    function editProjectTime(projectTab) {
        if (projl > 0) {
            for (var j = 0; j < projl; j++) {
                var projLine = [];
                for (var i = 1; i <= days.length; i++) {
                    projLine.push($("#P" + j + "D" + i)[0].value);
                }
                projectTab[j] = projLine;
            }
        }
    };

    function editLocationTime(morning, afternoon) {
        $('select').formSelect();
        for (var i = 0; i < days.length; i++) {
            var temp_morn = $('#select-' + days[i] + '-morning')[0];
            var temp_after = $('#select-' + days[i] + '-afternoon')[0];
            morning[i] = temp_morn.options[temp_morn.selectedIndex].value;
            afternoon[i] = temp_after.options[temp_after.selectedIndex].value;
        }
    };

    function runEdition(json) {
        var templateName = $('#templateName')[0].value;
        json.templateName = templateName;
        editProjectTime(json.projTime);
        editCatTime(json.time[0].value, json.time[1].value);
        editLocationTime(json.location_morn, json.location_after);
    };

    function deleteLineEdit(id, divId, event, json) {
        deleteLine(id, divId, event);
        if (id == "delete_") {
            for (var i = 0; i < json.projTime.length; i++) {
                if (event.target.id == id + i) {
                    json.projTime.splice(i, 1);
                }
            }
        }
        if (id == "deleteCat") {
            for (var i = 0; i < json.time[0].value.length; i++) {
                if (event.target.id == id + i) {
                    json.time[0].value.splice(i, 1);
                    json.time[1].value.splice(i, 1);
                }
            }
        }
    };

    function duplicateLineEdit(id, event, json) {
        duplicateLine(id, event);
        if (id == "duplicate_") {
            for (var i = 0; i < json.projTime.length; i++) {
                if (event.target.id == id + i) {
                    json.projTime.push(json.projTime[i]);
                }
            }
        }
        if (id == "duplicateCat") {
            for (var i = 0; i < json.time[0].value.length; i++) {
                if (event.target.id == id + i) {
                    json.time[0].value.push(json.time[0].value[i]);
                    json.time[1].value.push(json.time[1].value[i]);
                }
            }
        }
    }

    function editItem(param) {
        $('#popbtn').trigger('click');
        var tempJson = JSON.parse(localStorage.getItem(param));
        $('#templateName')[0].value = tempJson.templateName;
        displayProject(tempJson);
        $('button[id^=delete_]').click(function (event) {
            deleteLineEdit("delete_", "proj", event, tempJson);
        });
        $('button[id^=duplicate_]').click(function (event) {
            duplicateLineEdit("duplicate_", event, tempJson);
        });
        displayCategories(tempJson);
        $('button[id^=deleteCat]').click(function (event) {
            deleteLineEdit("deleteCat", "cat", event, tempJson);
        });
        $('button[id^=duplicateCat]').click(function (event) {
            duplicateLineEdit("duplicateCat", event, tempJson);
        });
        displayLocations(tempJson);
        $('#saveBtn2').click(function () {
            runEdition(tempJson);
            localStorage.setItem(tempJson.id, JSON.stringify(tempJson));
            location.reload();
        });
    };

    function duplicateItem(param) {
        var tempJ = JSON.parse(localStorage.getItem(param));
        tempJ.templateName = tempJ.templateName + "-copy";
        id = 0;
        while (localStorage.getItem(id) != null) {
            id++;
        }
        tempJ.id = id;
        storeJson(JSON.stringify(tempJ));
    };

});