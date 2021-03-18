import Picker from './picker';

export default class ToggleComponent extends Picker {
	readonly type: string = "toggle";
	constructor(title: string, public readonly options: [string, string], id: string) {
		super(title, options, id);
	}
}

