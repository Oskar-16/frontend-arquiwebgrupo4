import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Category } from "../Models/category";
import { enviroment } from "../../Enviroments/enviroments.developments";

@Injectable({
    providedIn: 'root',
})
export class Categoryservice {
    private url = `${enviroment.base}/categories`;

    constructor(private http: HttpClient) { }
    insert(c: Category) {
        return this.http.post(this.url, c);
    }

    eliminar(id:number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    listId(id:number) {
        return this.http.get<Category>(`${this.url}/${id}`);
    }

    update(id:number, c:Category) {
        return this.http.put(`${this.url}/${id}`, c, { responseType: 'text' });
    }

    list() {
        return this.http.get<Category[]>(this.url);
    }
}
