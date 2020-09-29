class SubmitButton {
    element: HTMLButtonElement;
    constructor() {
        this.element =
    <HTMLButtonElement>document.createElement('button');
        this.element.className = 'btn'
        this.element.innerText = 'Zapisz'
    }

    render(): HTMLElement {
        const div = document.createElement('div');
        div.appendChild(this.element);
        div.className = 'submitBtn'
        return div;
    }
}

export {SubmitButton};