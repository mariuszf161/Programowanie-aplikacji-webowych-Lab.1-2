import {SubmitButton} from './button';
import {Table} from './table';
import {Field} from './Ifield';

class Form {
    fields: Field[];
    formElement: HTMLFormElement;
    button: SubmitButton;
    results: Table

    constructor(id: string) {
        this.fields = new Array();
        this.formElement = <HTMLFormElement>document.getElementById(id);
    }

    render(): void {
        this.fields.forEach(field => this.formElement.appendChild(field.render()))
        this.formElement.appendChild(this.button.render());
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.results.add(this.getValue())
            this.clean();
        });
        this.results = new Table("showForm", this.fields)
    }
    getValue(): object {
        let value: any = { id: new Date().getTime().toString()};
        this.fields.forEach(field => {
            value[field.label] = field.getValue()
        })
        return value;
    }

    clean() {
        this.fields.forEach(field => {
            field.setValue("")
        })
    }
}

export {Form};