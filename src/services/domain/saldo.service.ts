import { API_CONFIG } from './../../config/api.config';
import { SaldoDTO } from '../../models/saldo.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SaldoService {

    constructor(public http: HttpClient) { }

    findLastSaldo(): Observable<SaldoDTO> {
        return this.http.get<SaldoDTO>(`${API_CONFIG.baseUrl}/saldos/last`);
    }
}