class Content {
  constructor() {
    chrome.runtime.sendMessage({ message: "activate_icon" });
    Utils.onTemplateReceived((template) => this.applyTemplate(template));
  }

  isTimeTable() {
    return $("#EX_TIME_DTL\\$scrolli\\$0").length > 0;
  }

  countLineTime() {
    var allElements = [];
    $("*").each(function (index, element) {
      if (element.id.includes("EX_TIME_DTL$new$")) {
        allElements.push(element.id);
      }
    });
    return allElements.length / 2;
  }

  isCorrectNumberLineTime(projects) {
    return this.countLineTime() == projects.length;
  }

  applyTemplate(template) {
    if (this.isTimeTable()) {
      this.applyProjects(template.projects);
      this.applyCategories(template.categories);
    }
    if (this.isRestTable()) {
      this.applyLocations(template.locations);
    }
  }

  applyProjects(projects) {
    if (projects) {
      if (!this.isCorrectNumberLineTime(projects)) {
        alert(
          "Nombre de lignes incorrect, vous devez avoir " +
            projects.length +
            " lignes pour ajouter ce template"
        );
      } else {
        projects.forEach((project, projectIndex) => {
          this.applyProject(project, projectIndex);
        });
      }
    }
  }

  applyProject(project, projectIndex) {
    this.applyValue("PROJECT_CODE", "", projectIndex, project.name);
    this.applyValue("ACTIVITY_CODE", "", projectIndex, "PROJET");
    project.days.forEach((day, dayIndex) => {
      if (day.includes(".")) {
        day = day.toString().replace(/\./g, ",");
      }
      this.applyValue("TIME", dayIndex + 1, projectIndex, day);
    });
  }

  applyCategories(categories) {
    if (categories) {
      categories.forEach((category) => this.applyCategory(category));
    }
  }

  applyCategory(category) {
    let categoryElement = $('span:contains("' + category.name + '")');
    if (categoryElement.length > 0) {
      let categoryId = categoryElement[0].id;
      let categoryIndex = categoryId.split("$")[1];
      category.days.forEach((day, dayIndex) =>
        this.applyValue("POL_TIME", dayIndex + 1, categoryIndex, day)
      );
    }
  }

  isRestTable() {
    return $("#UC_EX_TDLY_FR\\$scroll\\$0").length > 0;
  }

  applyLocations(locations) {
    if (locations) {
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        let morning = this.findDay(locations.morning, dayIndex);
        let afternoon = this.findDay(locations.afternoon, dayIndex);
        let dayoff = morning == "NA" && afternoon == "NA";

        this.applyLocation(dayIndex, morning, afternoon);
        this.applyRest(dayIndex, dayoff ? "NA" : "Y");
        this.applyLunch(dayIndex, dayoff ? 0 : 1);
      }
    }
  }

  applyLocation = function (dayIndex, morning, afternoon) {
    this.applyValue("UC_LOCATION_A", dayIndex + 1, 0, morning);
    this.applyValue("UC_LOCATION_A", dayIndex + 1, 1, afternoon);
  };

  applyLunch = function (dayIndex, value) {
    this.applyValue("UC_TIME_LIN_WRK_UC_DAILYREST1", dayIndex + 1, 0, value);
  };

  applyRest = function (dayIndex, value) {
    this.applyValue("UC_DAILYREST", dayIndex + 1, 0, value);
    this.applyValue("UC_DAILYREST", dayIndex + 1, 1, value);
    this.applyValue("UC_DAILYREST", dayIndex + 1, 2, value);
  };

  findDay(days, dayIndex) {
    return days ? days[dayIndex] : null;
  }

  applyLocation(location, locationIndex) {
    if (location) {
      location.forEach((day, dayIndex) =>
        this.applyValue("UC_LOCATION_A", dayIndex + 1, locationIndex, day)
      );
    }
  }

  applyValue(name, column, line, value) {
    var id = "#" + name + column + "\\$" + line;
    var elem = $(id);
    elem.val(value);
    var changeEvent = new Event("change", {
      bubbles: true,
      cancelable: true,
    });
    if (elem[0]) {
      $(elem)[0].dispatchEvent(changeEvent);
    }
  }
}

let content = new Content();
