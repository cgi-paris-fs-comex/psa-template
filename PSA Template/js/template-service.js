class TemplateService {

	insert(template) {
		this.insertOrUpdate(null, template)
	}

	insertOrUpdate(templateIndex, template) {
		let templates = this.readAll();
		if (templateIndex == null) {
			templates.push(template);
		} else {
			templates[templateIndex] = template;
		}
		this.saveAll(templates);
	}

	saveAll(templates) {
		localStorage.setItem("templates", JSON.stringify(templates));
	}

	read(templateIndex) {
		return this.readAll()[templateIndex]
	}

	readAll() {
		let templates = JSON.parse(localStorage.getItem("templates"))
		return templates == null ? [] : templates
	}

	delete(templateIndex) {
		let templates = this.readAll()
		templates.splice(templateIndex, 1)
		this.saveAll(templates);
	}

}

let templateService = new TemplateService()
