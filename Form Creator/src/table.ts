import {Field} from './IField';

export class Table {
    element: HTMLTableElement;
    fields: Field[];

    constructor(id, fields){
        this.fields = fields;
        this.element = <HTMLTableElement>document.getElementById(id);
        this.element.appendChild(this.getHeader());
        this.loadFromCache();
    }

    loadFromCache() {
        const cachedResults = JSON.parse(localStorage.getItem('results')) || []
        cachedResults.forEach(element => {
            this.renderRow(element)
        });
    }

    add(data): void{
        const res = JSON.parse(localStorage.getItem("results")) || [];
        res.push(data);
        localStorage.setItem("results", JSON.stringify(res));
        this.renderRow(data)
    }

    renderRow(data) {
        const trBody = document.createElement("tr");
        trBody.id = data.id

        this.fields.forEach(field => {
            const td = document.createElement("td");
            td.innerText = data[field.label];
            trBody.appendChild(td);
        })

        const tdUsun = document.createElement("td");
        const usunBtn = document.createElement("button");
        usunBtn.addEventListener("click", () => {
            this.element.removeChild(trBody);
            const res = JSON.parse(localStorage.getItem("results")) || []
            localStorage.setItem("results", JSON.stringify(res.filter(element => element.id !== trBody.id)));
        })

        tdUsun.appendChild(usunBtn);
        trBody.appendChild(tdUsun);
        this.element.appendChild(trBody);
    }


    getHeader() {
        const tr = document.createElement("tr");
        this.fields.forEach(field => {
            const th = document.createElement("th");
            th.innerText = field.label;
            tr.appendChild(th);
        })

        const thUsun = document.createElement("th")
        thUsun.innerText = "usuń"
        tr.appendChild(thUsun);
        return tr
    }
}