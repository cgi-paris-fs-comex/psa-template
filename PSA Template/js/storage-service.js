let KEY_VERSION = 'version'
let VERSION = '1'

class StorageService {

	constructor() {
		if (this.read(KEY_VERSION) != VERSION) {
			this.clear()
			this.write(KEY_VERSION, VERSION)
		}
	}

	write(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	read(key) {
		return JSON.parse(localStorage.getItem(key))
	}

	delete(key) {
		localStorage.removeItem(key)
	}

	clear() {
		localStorage.clear()
	}

}
