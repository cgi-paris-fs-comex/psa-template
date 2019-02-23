$(document).ready(function () {

	/* Display all templates */
	var container = $('#container');

	// TODO : Change access to a list of pdaTemplates
	for (var key in localStorage) {
		if (Number.isInteger(parseInt(key))) {
			if (localStorage.getItem(key) != null) {

				var psaTemplate = Tools.getPsaTemplate(key);

				// TODO : To remove
				var data = {
					id: psaTemplate.id,
					name: psaTemplate.templateName
				};

				var html = Tools.toHtml('container-content', data);

				container.append(html);
			}
		}
	}

	$('a').click(function (event) {
		var psaTemplate = Tools.getPsaTemplate(event.target.id);
		Tools.sendMessageToActiveTab(psaTemplate);
	});

});