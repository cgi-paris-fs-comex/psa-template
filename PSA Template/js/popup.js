$(document).ready(function () {

	/* Display all templates */
	var container = $('#templates-container');

	// TODO : Change access to a list of pdaTemplates
	for (var key in localStorage) {
		if (Number.isInteger(parseInt(key))) {
			if (localStorage.getItem(key) != null) {

				var psaTemplate = Utils.getPsaTemplate(key);

				// TODO : To remove
				var data = {
					id: psaTemplate.id,
					name: psaTemplate.templateName
				};

				var html = Utils.toHtml('template-element', data);

				container.append(html);
			}
		}
	}

	$('a').click(function (event) {
		var psaTemplate = Utils.getPsaTemplate(event.target.id);
		Utils.sendMessageToActiveTab(psaTemplate);
	});

});