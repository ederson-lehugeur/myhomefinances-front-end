import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UsuarioDTO } from '../../models/usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient, public storage: StorageService) {}

    findByEmail(email: string) : Observable<UsuarioDTO> {
        const token = this.storage.getLocalUser().token;
        const authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})

        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/usuarios/email?email=${email}`,
            { 'headers': authHeader });
    }
}