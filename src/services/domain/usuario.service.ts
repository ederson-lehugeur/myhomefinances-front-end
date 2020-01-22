import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UsuarioDTO } from '../../models/usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient, public storage: StorageService) {}

    findByEmail(email: string) : Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/usuarios/email?email=${email}`);
    }

    insert(usuario: UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`,
            usuario,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}