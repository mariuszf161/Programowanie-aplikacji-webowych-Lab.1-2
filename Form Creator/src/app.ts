import {Form} from './form';
import {CheckboxField, EmailField, TextAreaField, InputField, SelectField} from './input';
import {SubmitButton} from './button';
import './styles/styles.scss';

class App{
    form: any;
    constructor(){
        this.form = new Form('form');
    }
    createPresetForm(): void{
        let imie = new InputField('text','Imie: ');
        let nazwisko = new InputField('text','Nazwisko: ');
        let eLearning = new CheckboxField('elearn','E-learning: ');
        let plec = new CheckboxField('km', 'Płeć: ');
        let uwagi = new TextAreaField('area','Uwagi: ');
        let email = new EmailField('email','Email: ');
        let kraj = new SelectField('country', 'Kraj: ');

        this.form.fields.push(imie);
        this.form.fields.push(nazwisko);
        this.form.fields.push(eLearning);
        this.form.fields.push(plec);
        this.form.fields.push(uwagi);
        this.form.fields.push(email);
        this.form.fields.push(kraj);
        this.form.button = new SubmitButton()
        this.form.render();
    }

}

new App().createPresetForm();


