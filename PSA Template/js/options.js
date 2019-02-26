class Options {

	templateService = new TemplateService()
	storageService = new StorageService()
	templateIndex
	currentId = 0

	constructor() {
		$(document).ready(() => this.initialize());
	}

	initialize() {
		this.initializeLanguage()

		$('#addProjectBtn').click(() => this.newProject())
		$('#addCategoriesBtn').click(() => this.newCategory())
		$('#addTemplateBtn').click(() => this.emptyTemplateEdit())
		$('#saveTemplateBtn').click(() => this.saveTemplate())
		$('#language').change(() => this.changeLanguage())

		$('.modal').modal()

		this.createLocations();
		this.displayTemplates();
		Utils.translate();
		M.AutoInit();
	}

	initializeLanguage() {
		let language = this.storageService.read('language')
		if (language == null) {
			language = chrome.i18n.getUILanguage().split('-')[0]
			this.storageService.write('language', language)
		}
		$('#language').val(language)
	}

	changeLanguage() {
		this.storageService.write('language', $('#language').val())
	}

	createLocations() {
		let data = {
			days: days,
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
			days: days
		}
		var element = Utils.toElement('project-element', data);

		$('.delete', element).click(() => element.remove());
		$('.duplicate', element).click(() => this.duplicateProject(element));

		element.appendTo('#projectForm');
		Utils.translate(element);
		M.updateTextFields();
		return element;
	}

	duplicateProject(element) {
		let template = this.buildTemplate()
		let index = element.index()
		template.projects.splice(index + 1, 0, template.projects[index])
		this.fillTemplateEdit(template, this.templateIndex)
	}

	newCategory() {
		var data = {
			id: this.currentId++,
			days: days
		}

		var element = Utils.toElement('category-element', data);
		$('.delete', element).click(() => element.remove());
		$('.duplicate', element).click(() => this.duplicateCategory(element))
		element.appendTo('#categoriesForm')
		$('.autocomplete', element).autocomplete({
			data: categories[this.storageService.read('language')].reduce((result, current) => {
				result[current] = null
				return result
			}, {}),
			minLength: 0,
			dropdownOptions: { container: document.body, constrainWidth: false }
		})

		Utils.translate(element);
		M.updateTextFields();
		return element
	}

	duplicateCategory(element) {
		let template = this.buildTemplate()
		let index = element.index()
		template.categories.splice(index + 1, 0, template.categories[index])
		this.fillTemplateEdit(template, this.templateIndex)
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
		let template = this.buildTemplate()
		this.templateService.insertOrUpdate(this.templateIndex, template)
		this.displayTemplates()
	}

	buildTemplate() {
		let template = $('#template-form').serializeObject()
		if (template.projects) {
			template.projects = Object.values(template.projects)
		}
		if (template.categories) {
			template.categories = Object.values(template.categories)
		}
		return template
	}

	editTemplate(templateIndex) {
		let template = this.templateService.read(templateIndex)
		this.fillTemplateEdit(template, templateIndex)
	}

	fillTemplateEdit(template, templateIndex) {
		this.emptyTemplateEdit();
		this.templateIndex = templateIndex;

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
