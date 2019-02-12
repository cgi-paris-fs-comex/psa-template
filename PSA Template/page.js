chrome.runtime.sendMessage({ "message": "activate_icon" });
/* Configuration */
var time;
var locations_m;
var locations_a;
var category;

chrome.runtime.onMessage.addListener(startContentScript);

function startContentScript(message) {
	time = message.time;
	locations_m = message.location_m;
	locations_a = message.location_a;
	category = message.category;

	/* Code */

	var documents = [document];
	var iframes = document.getElementsByTagName('iframe');
	for (var iframeIndex = 0; iframeIndex < iframes.length; iframeIndex++) {
		documents.push(iframes[iframeIndex].contentDocument);
	}

	/* TIMETABLE */
	var timeTable = $('#l0EX_TIME_DTL\\$0');

	var updateTime = function () {
		console.log('onUpdateTime');
		updateTimeOnLine(0);
	};
	var updateTimeOnLine = function (line) {
		console.log('onUpdateTimeOnLine');
		if (category == "proj") {
			for (var column = 2; column <= 6; column++) {
				setValue('TIME', column, line, time);
			}
		}
		else {
			line = category;
			for (var column = 2; column <= 6; column++) {
				setValue('POL_TIME', column, line, time);
			}
		}

	};

	var restTable = $('#UC_EX_TDLY_FR\\$scroll\\$0');

	var updateRestLunchLocation = function () {  //methode pour changer la location (cgi, site client...etc)
		for (var column = 1; column <= 7; column++) {
			var location_m = locations_m[column - 1];
			var location_a = locations_a[column - 1];
			updateRestOnColumn(column, (location_m == 'NA' && location_a == 'NA') ? 'NA' : 'Y');
			updateLunchOnColumn(column, (location_m == 'NA' && location_a == 'NA') ? 0 : 1);
			updateLocationOnColumn(column, location_m, location_a);
		}

		/* Overtime requested by manager */
		$('#UC_EX_TIME_FR_H_UC_OT_RQST_MNGR\\$0').value = 0;
		/* including Sunday hours */
		$('#UC_EX_TIME_FR_H_UC_OT_RM_SUNDAY\\$0').value = 0;
		/* including public holidays but Sunday */
		$('#UC_EX_TIME_FR_H_UC_OT_RM_PUBLIC_HO\\$0').value = 0;
	};

	var updateLunchOnColumn = function (column, value) {
		setValue('UC_TIME_LIN_WRK_UC_DAILYREST1', column, 0, value);
	};

	var updateRestOnColumn = function (column, value) {
		for (var line = 0; line < 3; line++) {
			setValue('UC_DAILYREST', column, line, value);
		}
	};

	var updateLocationOnColumn = function (column, value_m, value_a) {
		setValue('UC_LOCATION_A', column, 0, value_m);
		setValue('UC_LOCATION_A', column, 1, value_a);
	};

	var setValue = function (name, column, line, value) {
		var id = '#' + name + column + '\\$' + line;
		var elem = $(id);
		elem.val(value);
		var changeEvent = document.createEvent("HTMLEvents");
		changeEvent.initEvent("change", true, true);
		if ((elem)[0]) {
			$(elem)[0].dispatchEvent(changeEvent);
		}
	};

	if (timeTable.length != 0 && restTable.length != 1) {
		updateTime();
	}
	if (restTable.length != 0) {
		updateRestLunchLocation();
	}

}
