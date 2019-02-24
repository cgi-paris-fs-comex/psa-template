class Options {

	templateService = new TemplateService()
	templateIndex
	currentId = 0

	constructor() {
		$(document).ready(() => {

			$('#addProjectBtn').click(() => this.newProject());
			$('#addCategoriesBtn').click(() => this.newCategory());
			$('#addTemplateBtn').click(() => this.emptyTemplateEdit());
			$('#saveTemplateBtn').click(() => this.saveTemplate())

			this.createLocations();
			this.displayTemplates();
			Utils.translate();

		});
	}

	createLocations() {
		let data = {
			days: days_new,
			locations: locations
		}
		let element = Utils.toElement('locations-element', data);
		element.appendTo('#locationTable')
		element.find('select').formSelect();
	}

	displayTemplates() {
		let container = $('#templatesBody')
		container.empty()
		let templates = this.templateService.readAll()
		for (let templateIndex = 0; templateIndex < templates.length; templateIndex++) {
			let template = templates[templateIndex]
			let element = Utils.toElement('template-element', template)

			$('.edit', element).click(() => this.editTemplate(templateIndex))
			$('.delete', element).click(() => this.deleteTemplate(templateIndex))
			$('.duplicate', element).click(() => this.duplicateTemplate(templateIndex))

			element.appendTo(container)
		}
	}

	newProject() {
		var data = {
			id: this.currentId++,
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

	newCategory() {
		var data = {
			id: this.currentId++,
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

	emptyTemplateEdit() {
		this.templateIndex = null
		this.currentId = 0
		$('#name', '#template-form').val('')
		$('#projectForm').empty()
		$('#categoriesForm').empty()
		$('select', '#locationTable').val('').formSelect()
		M.updateTextFields();
	}

	saveTemplate() {
		let template = $('#template-form').serializeObject()
		if (template.projects) {
			template.projects = Object.values(template.projects)
		}
		if (template.categories) {
			template.categories = Object.values(template.categories)
		}

		this.templateService.insertOrUpdate(this.templateIndex, template)
		this.displayTemplates()
	}

	editTemplate(templateIndex) {
		this.emptyTemplateEdit();
		this.templateIndex = templateIndex;
		let template = this.templateService.read(templateIndex)

		let form = $('#template-form');

		form.find('#name').val(template.name)

		if (template.projects) {
			for (let project of template.projects) {
				let element = this.newProject()
				element.find('.name').val(project.name)
				element.find('.day').each((dayIndex, input) => {
					$(input).val(project.days[dayIndex])
				})
			}
		}

		if (template.categories) {
			for (let category of template.categories) {
				let element = this.newCategory()
				element.find('.name').val(category.name)
				element.find('.day').each((dayIndex, input) => {
					$(input).val(category.days[dayIndex])
				})
			}
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

	duplicateTemplate(templateIndex) {
		let template = this.templateService.read(templateIndex)
		let name = template.name
		let match = name.match(/\(([0-9]+)\)/)
		if (match == null) {
			name += " (1)"
		} else {
			name = name.replace(match[0], "(" + (new Number(match[1]) + 1) + ")")
		}
		template.name = name
		this.templateService.insert(template)
		this.displayTemplates()
	}

	deleteTemplate(templateIndex) {
		this.templateService.delete(templateIndex)
		this.displayTemplates()
	}

}

let options = new Options()
