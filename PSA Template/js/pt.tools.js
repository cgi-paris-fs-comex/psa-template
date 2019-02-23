
pt.tools = {

    toHtml(templateId, data) {
        var template = $('#' + templateId).html();
        var html = Mustache.to_html(template, data);
        return html;
    },

    sendMessage(data) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, (tabs) => {
            tabs.forEach((tab) => {
                console.log('sending message to ' + tab.id);
                chrome.tabs.sendMessage(tab.id, data, () => {
                    console.log('message sent to ' + tab.id);
                });
            });
        });
    },

    getPsaTemplate(psaTemplateId) {
        return JSON.parse(localStorage.getItem(psaTemplateId));
    }

}
