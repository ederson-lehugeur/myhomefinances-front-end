import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    insert(categoria: CategoriaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/categorias`,
            categoria,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(categoriaId: string) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/categorias/${categoriaId}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(categoria: CategoriaDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/categorias/${categoria.id}`,
            categoria,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}