import { API_CONFIG } from '../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegistroDTO } from '../../models/registro.dto';

@Injectable()
export class RegistroService {

    constructor(public http: HttpClient) { }

    findAllPageable(
        page: number = 0,
        itemsPerPage: number = 12,
        orderBy: string = 'dataHora',
        direction: string = 'DESC') {

        return this.http.get(`${API_CONFIG.baseUrl}/registros/pageable?page=${page}&linesPerPage=${itemsPerPage}&orderBy=${orderBy}&direction=${direction}`);
    }

    insert(registro: RegistroDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/registros`,
            registro,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}