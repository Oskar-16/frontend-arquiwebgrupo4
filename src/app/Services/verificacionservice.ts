import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { Verificacion } from "../Models/verificacion";

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

  // POST /users -> crea usuario (el backend espera la entidad User)
  insert(v: Verificacion) {
    return this.http.post(this.url, v);
  }

  // DELETE /users/{id}
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  // GET /users/{id}
  listId(id: number) {
    return this.http.get<Verificacion>(`${this.url}/${id}`);
  }

  // KYC: PUT /users/{id}/verify -> marca al usuario como verificado.
  // (No hay PUT /users/{id} genérico; la acción real de KYC es "verify".)
  update(v: Verificacion) {
    return this.http.put(`${this.url}/${v.idUser}/verify`, {}, { responseType: 'text' });
  }
}
