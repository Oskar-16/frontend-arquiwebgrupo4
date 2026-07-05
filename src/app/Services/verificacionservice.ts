import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Verificacion } from "../Models/verificacion";
import { enviroment } from "../../Enviroments/enviroments.developments";

@Injectable({
  providedIn: 'root',
})
export class Verificacionservice {
  // Alineado al backend real: el KYC vive en el UserController (/users).
  // No existe /api-verificacion en el backend.
  private url = `${enviroment.base}/users`;

  constructor(private http: HttpClient) { }

  // GET /users  -> lista de usuarios (UserResponseDTO[])
  list() {
    return this.http.get<Verificacion[]>(this.url);
  }

  // PUT /users/{id}/disable -- soft-delete real y seguro (no rompe FKs).
  deshabilitar(id: number) {
    return this.http.put(`${this.url}/${id}/disable`, {});
  }

  // PUT /users/{id}/enable
  habilitar(id: number) {
    return this.http.put(`${this.url}/${id}/enable`, {});
  }

  // GET /users/{id}
  listId(id: number) {
    return this.http.get<Verificacion>(`${this.url}/${id}`);
  }
  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }
  // KYC: PUT /users/{id}/verify -> marca al usuario como verificado.
  // (No hay PUT /users/{id} genérico; la acción real de KYC es "verify".)
  update(v: Verificacion) {
    return this.http.put(`${this.url}/${v.idUser}/verify`, {}, { responseType: 'text' });
  }
}
