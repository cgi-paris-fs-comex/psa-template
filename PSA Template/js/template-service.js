let KEY_TEMPLATES = 'templates'

class TemplateService {

	storageService = new StorageService()

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
		this.storageService.write(KEY_TEMPLATES, templates);
	}

	read(templateIndex) {
		return this.readAll()[templateIndex]
	}

	readAll() {
		let templates = this.storageService.read(KEY_TEMPLATES)
		return templates == null ? [] : templates
	}

	delete(templateIndex) {
		let templates = this.readAll()
		templates.splice(templateIndex, 1)
		this.saveAll(templates);
	}

}
