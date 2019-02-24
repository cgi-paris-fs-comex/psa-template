
class Utils {

	static currentId = 0;

	static resetId() {
		Utils.currentId = 0;
	}

	static nextId() {
		return Utils.currentId++;
	}

	static toElement(templateId, data) {
		return $(Utils.toHtml(templateId, data))
	}

	static toHtml(templateId, data) {
		var template = $('#' + templateId).html();
		var html = Mustache.to_html(template, data);
		return html;
	}

	static sendMessageToActiveTab(data) {
		chrome.tabs.query({
			currentWindow: true,
			active: true
		}, (tabs) => tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, data)))
	}

	static translate(parent) {
		$('[translate]', parent).each((index, dom) => {
			let element = $(dom)
			if (element.data('translate') == null) {
				element.data('translate', element.text())
			}
			element.text(Utils.getMessage(element.data('translate')))
		})
	}

	static getMessage(key) {
		return chrome.i18n.getMessage(key);
	}

}

$.fn.serializeObject = function () {
	let result = {};
	let form = this.serializeArray();

	let explore = (parent, parentKey, path, pathIndex, value) => {
		if (pathIndex == path.length) {
			parent[parentKey] = value;
		} else {
			let key = path[pathIndex]
			let child;
			if (!parent[parentKey]) {
				if (isNaN(key)) {
					parent[parentKey] = {};
				} else {
					parent[parentKey] = [];
				}
			}
			explore(parent[parentKey], key, path, pathIndex + 1, value)
		}
	}

	form.forEach((field) => {
		let path = field.name.split(/\./)
		explore(result, path[0], path, 1, field.value)
	})

	return result;
};