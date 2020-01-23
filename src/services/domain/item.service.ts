import { API_CONFIG } from './../../config/api.config';
import { ItemDTO } from '../../models/item.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ItemService {

    constructor(public http: HttpClient) {}

    findAll() : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONFIG.baseUrl}/itens`);
    }
}