$(document).ready(function () {

	var container = $('#templates-container');

	for (let template of Utils.readTemplates()) {
		let element = Utils.toElement('template-element', template)
		$('.apply', element).click(() => Utils.sendMessageToActiveTab(template))
		element.appendTo(container)
	}

});