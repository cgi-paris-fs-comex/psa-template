class Options {

	static templateIndex

	static createLocations() {
		var data = {
			days: days_new,
			locations: locations
		}
		var element = Utils.toElement('locations-element', data);
		element.appendTo('#locationTable')
		element.find('select').formSelect();
	}

	static displayTemplates() {
		var container = $('#templatesBody')
		container.empty()
		let templates = Utils.readTemplates()
		for (let templateIndex = 0; templateIndex < templates.length; templateIndex++) {
			let template = templates[templateIndex]
			let element = Utils.toElement('template-element', template)

			$('.edit', element).click(() => Options.editTemplate(templateIndex))
			$('.delete', element).click(() => Options.deleteTemplate(templateIndex))
			$('.duplicate', element).click(() => Options.duplicateTemplate(templateIndex))

			element.appendTo(container)
		}
	}

	static newProject() {
		var data = {
			id: Utils.nextId(),
			days: days_new
		}
		var element = Utils.toElement('project-element', data);

		$('.delete', element).click(() => element.remove());
		$('.duplicate', element).click(() => {
			console.log('copying');
		});

		element.appendTo('#projectForm');
		Utils.translate(element);
		M.updateTextFields();
		return element;
	}

	static newCategory() {
		var data = {
			id: Utils.nextId(),
			categories: categories,
			days: days_new
		}

		var element = Utils.toElement('category-element', data);
		$('.delete', element).click(() => element.remove());
		$('.duplicate', element).click(() => {
			console.log('copying');
		});
		element.appendTo('#categoriesForm');
		element.find('select').formSelect();
		Utils.translate(element);
		M.updateTextFields();
		return element
	}

	static emptyTemplateEdit() {
		Options.templateIndex = null
		$('#name', '#template-form').val('')
		$('#projectForm').empty()
		$('#categoriesForm').empty()
		$('select', '#locationTable').val('').formSelect()
		Utils.resetId()
		M.updateTextFields();
	}

	static saveTemplate() {
		let template = $('#template-form').serializeObject()
		template.projects = Object.values(template.projects)
		template.categories = Object.values(template.categories)

		Utils.saveTemplate(template, Options.templateIndex)
		Options.displayTemplates()
	}

	static editTemplate(templateIndex) {
		Options.emptyTemplateEdit();
		Options.templateIndex = templateIndex;
		let template = Utils.readTemplate(templateIndex)

		let form = $('#template-form');

		form.find('#name').val(template.name)

		for (let project of template.projects) {
			let element = Options.newProject()
			element.find('.name').val(project.name)
			element.find('.day').each((dayIndex, input) => {
				$(input).val(project.days[dayIndex])
			})
		}

		for (let category of template.categories) {
			let element = Options.newCategory()
			element.find('.name').val(category.name)
			element.find('.day').each((dayIndex, input) => {
				$(input).val(category.days[dayIndex])
			})
		}

		if (template.locations) {
			if (template.locations.morning) {
				$('.morning').each((dayIndex, input) => {
					$(input).val(template.locations.morning[dayIndex])
				})
			}
			if (template.locations.afternoon) {
				$('.afternoon').each((dayIndex, input) => {
					$(input).val(template.locations.afternoon[dayIndex])
				})
			}
		}

		M.updateTextFields();
		form.find('select').formSelect();
	}

	static duplicateTemplate(templateIndex) {
		let template = Utils.readTemplate(templateIndex)
		let name = template.name
		let match = name.match(/\(([0-9]+)\)/)
		if (match == null) {
			name += " (1)"
		} else {
			name = name.replace(match[0], "(" + (new Number(match[1]) + 1) + ")")
		}
		template.name = name
		Utils.saveTemplate(template)
		Options.displayTemplates()
	}

	static deleteTemplate(templateIndex) {
		Utils.deleteTemplate(templateIndex)
		Options.displayTemplates()
	}

}

$(document).ready(function () {

	$('#addProjectBtn').click(() => Options.newProject());
	$('#addCategoriesBtn').click(() => Options.newCategory());
	$('#addTemplateBtn').click(() => Options.emptyTemplateEdit());
	$('#saveTemplateBtn').click(() => Options.saveTemplate())

	Options.createLocations();
	Options.displayTemplates();
	Utils.translate();

});