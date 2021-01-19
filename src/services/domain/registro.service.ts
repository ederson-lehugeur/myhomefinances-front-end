import { API_CONFIG } from '../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegistroDTO } from '../../models/registro.dto';

@Injectable()
export class RegistroService {

    constructor(public http: HttpClient) { }

    findAllPageable(
        page: number = 0,
        size: number = 12,
        sort: string = 'dataHora',
        direction: string = 'DESC') {

        return this.http.get(`${API_CONFIG.baseUrl}/registros?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
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

    delete(registroId: string) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/registros/${registroId}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}