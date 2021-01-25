import { Injectable } from "@angular/core";

@Injectable()
export class DateService {

    constructor() { }

    formatDate(date: Date): string {
        const day = '0'.concat(date.getDate().toString()).substr(-2);
        const month = '0'.concat((date.getMonth() + 1).toString()).substr(-2);
        const year = date.getFullYear();

        const hour = '0'.concat(date.getHours().toString()).substr(-2);
        const min = '0'.concat(date.getMinutes().toString()).substr(-2);
        const sec = '0'.concat(date.getSeconds().toString()).substr(-2);

        const mil = '00'.concat(date.getMilliseconds().toString()).substr(-3);

        return `${day}/${month}/${year} ${hour}:${min}:${sec}.${mil}`;
    }

    formatDateUTC(date: Date): string {
        return this.formatDate(date).concat(' UTC');
    }

}