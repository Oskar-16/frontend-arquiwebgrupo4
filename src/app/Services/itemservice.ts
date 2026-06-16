import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from '@angular/common/http';
import { Item } from "../Models/item";

@Injectable({
    providedIn: 'root',
})
export class Itemservice {
    private url = `${enviroment.base}/items`;

    constructor(private http: HttpClient) {}

    list() {
        return this.http.get<Item[]>(this.url);
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
