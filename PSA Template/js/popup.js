$(document).ready(function () {

    /* Display all templates */
    var container = $('#container');

    // TODO : Change access to a list of pdaTemplates
    for (var key in localStorage) {
        if (Number.isInteger(parseInt(key))) {
            if (localStorage.getItem(key) != null) {

                var psaTemplate = pt.tools.getPsaTemplate(key);

                // TODO : To remove
                var data = {
                    id: psaTemplate.id,
                    name: psaTemplate.templateName
                };

                var html = pt.tools.toHtml('container-content', data);

                psaTemplates.append(html);
            }
        }
    }

    /* Send the templates informations to page.js */
    $('a').click(function (event) {
        var psaTemplate = pt.tools.getPsaTemplate(event.target.id);
        pt.tools.sendMessage(psaTemplate);
    });

});