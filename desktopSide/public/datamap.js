
class DataMap {
	constructor(data, cb) {
		this.sections = [];
		this.sectionData = [];
		this.components = [];
		this.variables = [];
		for (let section of data) {
			this.sections.push(section.title);
			let sectionData = [];
			this.components.push({
				title: section.title,
				type: "header"
			});
			for (let r of section.rows) {
				sectionData.push(r);
				this.components.push(r);
				if (Array.isArray(r)) {
					for (let i of r) {
						this.variables.push(i.id);
					}
				}
				this.variables.push(r.id);
			}
			this.sectionData.push(sectionData);
		}
		this.raw = data;
		this.data = {};
		for (let i of this.variables) {
			this.data[i] = 0;
		}
		this.cb = cb;
		this.key = 0;
	}
	updateData(newData) {
		this.data = newData;
		this.cb();
	}
	dataUpdated(newValue, id) {
		this.data[id] = newValue;
		this.cb();
	}
}

//module.exports = dataMap;