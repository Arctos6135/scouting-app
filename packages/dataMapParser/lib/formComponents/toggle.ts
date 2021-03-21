import Picker from './picker';

export default class ToggleComponent extends Picker {
	readonly type: string = "toggle";
	constructor(public readonly options: [string, string]) {
		super(options);
	}
}

