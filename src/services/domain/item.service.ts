import { API_CONFIG } from './../../config/api.config';
import { ItemDTO } from '../../models/item.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ItemService {

    constructor(public http: HttpClient) { }

    findAll(page: number = 0, itemsPerPage: number = 12) {
        return this.http.get(`${API_CONFIG.baseUrl}/itens?page=${page}&linesPerPage=${itemsPerPage}`);
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