import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from '@angular/common/http';
import { Category } from "../Models/category";

@Injectable({
    providedIn: 'root',
})
export class Categoryservice {
    private url = `${enviroment.base}/categories`;

    constructor(private http: HttpClient) {}

    list() {
        return this.http.get<Category[]>(this.url);
    }
}
