import { FormComponent, FormSection } from './formInput';

type DataForm = FormSection[];

export class DataMap {
	name: string;
	form: DataForm;
}

export type FormData = { [id: string]: string | number };
