import {FieldType} from './EfieldType';

interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
    setValue(value: any): void
}
export {Field};