import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Verificacion } from "../models/Verificacion";

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Verificacionservice {
  private url = `${base_url}/api-verificacion`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Verificacion[]>(`${this.url}/lista`);
  }

  insert(v: Verificacion) {
    return this.http.post(`${this.url}/nuevo`, v);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }

  listId(id: number) {
    return this.http.get<Verificacion>(`${this.url}/${id}`)
  }


  update(v: Verificacion) {
    return this.http.put(`${this.url}/actualiza`, v, { responseType: 'text' })
  }
}