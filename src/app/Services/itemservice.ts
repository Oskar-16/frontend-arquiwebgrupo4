import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Item } from "../Models/item-request";
import { ItemResponse } from "../Models/item-response";
import { enviroment } from "../../Enviroments/enviroments.developments";

@Injectable({
    providedIn: 'root',
})
export class Itemservice {
    private url = `${enviroment.base}/items`;

    constructor(private http: HttpClient) {}

    list() {
        return this.http.get<Item[]>(this.url);
    }

    // Respuesta tipada del backend (incluye user y category) para listar/detalle.
    listResponse() {
        return this.http.get<ItemResponse[]>(this.url);
    }

    listIdResponse(id: number) {
        return this.http.get<ItemResponse>(`${this.url}/${id}`);
    }

    // Items de un usuario (para "Mis items" y "Proponer trueque").
    listByUser(userId: number) {
        return this.http.get<ItemResponse[]>(`${this.url}/user/${userId}`);
    }

    // HU03: búsqueda por texto en el backend
    buscar(q: string) {
        return this.http.get<ItemResponse[]>(`${this.url}/search`, { params: { q } });
    }

    insert(i: Item) {
        return this.http.post(this.url, i);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<Item>(`${this.url}/${id}`);
    }

    update(id: number, i: Item) {
        return this.http.put(`${this.url}/${id}`, i, { responseType: 'text' });
    }
}
