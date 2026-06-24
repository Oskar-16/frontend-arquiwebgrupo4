import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from '@angular/common/http';
import { Trade } from "../Models/trade";

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
