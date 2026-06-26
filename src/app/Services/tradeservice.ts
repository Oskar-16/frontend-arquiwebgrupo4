import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Trade } from "../Models/trade";
import { enviroment } from "../../Enviroments/enviroments.developments";

@Injectable({
    providedIn: 'root',
})
export class Tradeservice {
    private url = `${enviroment.base}/trades`;

    constructor(private http: HttpClient) {}

    recibidos() {
        return this.http.get<Trade[]>(`${this.url}/received`);
    }

    enviados() {
        return this.http.get<Trade[]>(`${this.url}/sent`);
    }

    aceptar(id: number) {
        return this.http.put(`${this.url}/${id}/accept`, {});
    }

    rechazar(id: number) {
        return this.http.put(`${this.url}/${id}/reject`, {});
    }

    cancelar(id: number) {
        return this.http.put(`${this.url}/${id}/cancel`, {});
    }
}
