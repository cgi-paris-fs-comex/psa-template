class Content {

	constructor() {
		Utils.onTemplateReceived((template) => this.applyTemplate(template))
	}

	applyTemplate(template) {
		if (this.isTimeTable()) {
			this.applyProjects(template.projects)
			this.applyCategories(template.categories)
		}
		if (this.isRestTable()) {
			this.applyLocations(template.locations)
		}
	}

	isTimeTable() {
		return $('#l0EX_TIME_DTL\\$0').length > 0
	}

	applyProjects(projects) {
		if (projects) {
			projects.forEach((project, projectIndex) => this.applyProject(project, projectIndex))
		}
	}

	applyProject(project, projectIndex) {
		project.days.forEach((day, dayIndex) => this.applyValue('TIME', dayIndex, projectIndex, day))
	}

	applyCategories(categories) {
		if (categories) {
			categories.forEach((category) => this.applyCategory(category))
		}
	}

	applyCategory(category) {
		let categoryElement = $('span:contains("' + category.name + '")')
		if (categoryElement.length > 0) {
			let categoryId = categoryElement[0].id
			let categoryIndex = categoryId.split('$')[1];
			category.days.forEach((day, dayIndex) => this.applyValue('POL_TIME', dayIndex, categoryIndex, day))
		}
	}

	isRestTable() {
		return $('#UC_EX_TDLY_FR\\$scroll\\$0').length > 0
	}

	applyLocations(locations) {
		if (locations) {
			for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
				let morning = this.findDay(locations.morning, dayIndex)
				let afternoon = this.findDay(locations.afternoon, dayIndex)
				let dayoff = morning == 'NA' && afternoon == 'NA'

				this.applyLocation(dayIndex, morning, afternoon)
				this.applyRest(dayIndex, dayoff ? 'NA' : 'Y');
				this.applyLunch(dayIndex, dayoff ? 0 : 1);
			}
		}
	}

	applyLocation = function (dayIndex, morning, afternoon) {
		this.applyValue('UC_LOCATION_A', dayIndex, 0, morning);
		this.applyValue('UC_LOCATION_A', dayIndex, 1, afternoon);
	}

	applyLunch = function (dayIndex, value) {
		this.applyValue('UC_TIME_LIN_WRK_UC_DAILYREST1', dayIndex, 0, value);
	}

	applyRest = function (dayIndex, value) {
		this.applyValue('UC_DAILYREST', dayIndex, 0, value);
		this.applyValue('UC_DAILYREST', dayIndex, 1, value);
		this.applyValue('UC_DAILYREST', dayIndex, 2, value);
	}

	findDay(days, dayIndex) {
		return days ? days[dayIndex] : null
	}

	applyLocation(location, locationIndex) {
		if (location) {
			location.forEach((day, dayIndex) => this.applyValue('UC_LOCATION_A', dayIndex, locationIndex, day))
		}
	}

	applyValue(name, column, line, value) {
		column++

		var id = '#' + name + column + '\\$' + line;
		var elem = $(id);
		elem.val(value);
		var changeEvent = document.createEvent("HTMLEvents");
		changeEvent.initEvent("change", true, true);
		if ((elem)[0]) {
			$(elem)[0].dispatchEvent(changeEvent);
		}
	}

}

let content = new Content()

chrome.runtime.sendMessage({ "message": "activate_icon" });
