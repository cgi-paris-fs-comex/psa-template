class Popup {

	templateService = new TemplateService()

	constructor() {
		$(document).ready(() => this.displayTemplates());
	}

	displayTemplates() {
		var container = $('#templates-container');
		for (let template of this.templateService.readAll()) {
			let element = Utils.toElement('template-element', template)
			$('.apply', element).click(() => Utils.sendTemplate(template))
			element.appendTo(container)
		}
	}
}

let popup = new Popup()