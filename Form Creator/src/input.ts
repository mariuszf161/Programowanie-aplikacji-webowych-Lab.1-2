import {Field} from './IField';
import {FieldType} from './EFieldType';

class InputField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.type = FieldType.textInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
    setValue(value): void {
        this.element.value = value
    }
}

class CheckboxField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.checkboxInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.checked
    }
    setValue(checked): void {
        this.element.checked = checked
    }
}
class TextAreaField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.textAreaInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    }
    getValue(): any {
        return this.element.value
    }
    setValue(value): void {
        this.element.value = value
    }
}
class EmailField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.emailInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    }
    getValue(): any {
        return this.element.value
    }
    setValue(value): void {
        this.element.value = value
    }
}

class SelectField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLSelectElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLSelectElement>document.createElement('select');
        this.name = name;
        this.label = label;
        this.element.name = this.name;

    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        this.fetchOptions<{ name: string, region: string }>("https://restcountries.eu/rest/v2/all").then((data) => {
            data.filter(x => x.region === 'Europe').map(x => x.name).forEach(e => {
                let option = <HTMLOptionElement>document.createElement("option");
                option.id = 'countries';
                option.text = e;
                option.value = e;
                this.element.options.add(option);
            })
        });

        return div

    }
    fetchOptions<T>(url: string): Promise<T[]> {
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch((e) => {
                console.log("API errore fetching ");
            });
    }

    getValue(): any {
        return this.element.value
    }
    setValue(value): void {
        this.element.value = value
    }
}

export {CheckboxField, EmailField, TextAreaField, InputField, SelectField};