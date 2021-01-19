import { API_CONFIG } from './../../config/api.config';
import { ItemDTO } from '../../models/item.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class ItemService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONFIG.baseUrl}/itens`);
    }

    findAllPageable(page: number = 0, size: number = 12, sort: string = 'nome', direction: string = 'ASC') {
        return this.http.get(`${API_CONFIG.baseUrl}/itens?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    }

    insert(item: ItemDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/itens`,
            item,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(itemId: string) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/itens/${itemId}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(item: ItemDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/itens/${item.id}`,
            item,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}