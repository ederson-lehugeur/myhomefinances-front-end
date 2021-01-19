import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TipoRegistroDTO } from '../../models/tipo-registro.dto';

@Injectable()
export class TipoRegistroService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<TipoRegistroDTO[]> {
        return this.http.get<TipoRegistroDTO[]>(`${API_CONFIG.baseUrl}/tipos-registros`);
    }

}