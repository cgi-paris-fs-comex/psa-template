console.log("on options");
$(document).ready(function () {
    if (localStorage.length != 0) {
        displayTemplate();
    }
    var catl = 0;
    var projl = 0;
    function addProject(line) {
        $('#projectForm')[0].innerHTML += "<div id='proj" + line + "0' class='row'>";
        for (var i = 1; i < days.length + 1; i++) {
            $('#projectForm')[0].innerHTML += "<div id='proj" + line + i.toString() + "' class='col s1 input-field'><input type='text' id='P" + line + "D" + i + "'><label class='active' for='P" + line + "D" + i + "'>" + days[i - 1] + "</label></div>";
        }
        $('#projectForm')[0].innerHTML += "<div id='proj" + line + '8' + "' class='col input-field'><button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text red lighten-1 btn material-icons' id='delete" + line + "'>delete</button></div></div>";
        line++;
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
        projl++;
        for (var i = 0; i < projl - 1; i++) {
            for (var j = 0; j < 7; j++) {
                $("#P" + i + "D" + (j + 1))[0].value = temp[i][j];
            }
        }
    };

    function addCategory(line) {
        var cat = "<div id = 'cat" + line + "' class='row'><div class='col s3 input-field'><select id='select" + line + "'>";
        for (var i = 0; i < categories.length; i++) {
            cat += "<option value='" + categories[i] + "'>" + categories[i] + "</option>";
        }
        cat += "</select></div>";
        for (var i = 1; i < days.length + 1; i++) {
            cat += "<div class='col s1 input-field'><input type='text' id='C" + line + "D" + i + "'><label class='active' for='C" + line + "D" + i + "'>" + days[i - 1] + "</label></div>";
        }
        cat += "<div  class='col input-field'><button data-target='Dialog' class='modal-trigger waves-effect waves-light white-text red lighten-1 btn material-icons' id='deleteCat" + line + "'>delete</button></div></div>";
        $('#categoriesForm')[0].innerHTML += cat;
        line++;
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
        addCategory(catl)
        catl++;
        for (var i = 0; i < catl - 1; i++) {
            for (var j = 0; j < 7; j++) {
                $("#C" + i + "D" + (j + 1))[0].value = temp[i][j];
            }
            $("#select" + i)[0].value = temp2[i];
        }
    };

    $('#popbtn').click(function () {
        $('.modal').modal();
        $('#addProjectBtn').click(function () {
            if (projl == 0) {
                addProject(projl)
                projl++;
            }
            else {
                addProjectToOthers();
            }
            deleteLine("delete", "proj", projl);
        });
        $('#addCategoriesBtn').click(function () {
            $('select').formSelect('destroy');
            if (catl == 0) {
                addCategory(catl)
                catl++
            }
            else {
                addCategoryToOthers()
            }
            deleteLine("deleteCat", "cat", catl);
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

    function deleteLine(id, divId, type) {
        if (type > 0) {
            $('button').click(function (event) {
                for (var i = 0; i < type; i++) {
                    if (event.target.id == (id + i)) {
                        if (id == "delete") {
                            middleDelProj(i,divId,type);
                            projl--;
                        }
                        else {
                            middleDelCat(i,divId,type);
                            catl--;
                        }
                    }
                }
            });
        }
    };

    function middleDelProj(boucle , div ,typ){
        if ((projl > 1) || (boucle != (typ - 1))) {
            for (var l = boucle; l < typ - 1; l++) {
                for (var k = 1; k < days.length + 1; k++) {
                    $("#P" + l + "D" + k)[0].value = $("#P" + (l + 1) + "D" + k)[0].value;
                }
            }
            for (var j = 0; j < 9; j++) {
                $("#" + (div + (typ - 1) + j))[0].remove();
            }
        }
        else {
            for (var j = 0; j < 9; j++) {
                $("#" + (div + boucle + j))[0].remove();
            }
        }
    };

    function middleDelCat(boucle , div ,typ){
        if ((catl > 1) || (boucle != (typ - 1))) {
            for (var l = boucle; l < typ - 1; l++) {
                for (var k = 1; k < days.length + 1; k++) {
                    $("#C" + l + "D" + k)[0].value = $("#C" + (l + 1) + "D" + k)[0].value;
                }
                $("#select" + l)[0].value = $("#select" + (l + 1))[0].value;
            }
            $("#" + (div + (typ - 1)))[0].remove();
        }
        else {
            $("#" + (div + i))[0].remove();
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
            if (localStorage.getItem(key) != null) {
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
            catl = json.time[0].value.length;
            for (var i = 0; i < json.time[0].value.length; i++) {
                addCategory(i)
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
            projl = json.projTime.length;
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

    function deleteLineEdit(id, divId, type, json) {
        deleteLine(id, divId, type);
        $('button').click(function (event) {
            if (id == "delete") {
                for (var i = 0; i < json.projTime.length; i++) {
                    if (event.target.id == id + i) {
                        json.projTime.splice(i, 1);
                    }
                }
            }
            else {
                for (var i = 0; i < json.time[0].value.length; i++) {
                    if (event.target.id == id + i) {
                        json.time[0].value.splice(i, 1);
                        json.time[1].value.splice(i, 1);
                    }
                }
            }

        });
    };

    function editItem(param) {
        $('#popbtn').trigger('click');
        var tempJson = JSON.parse(localStorage.getItem(param));
        $('#templateName')[0].value = tempJson.templateName;
        displayProject(tempJson);
        deleteLineEdit("delete", "proj", projl, tempJson);
        displayCategories(tempJson);
        deleteLineEdit("deleteCat", "cat", catl, tempJson);
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