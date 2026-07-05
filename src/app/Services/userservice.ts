import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../Enviroments/enviroments.developments';

export interface Usuario {
  idUser: number;
  emailUser: string;
  usernameUser: string;
  is_premiumUser: boolean;
  is_verifiedUser: boolean;
}

// HU07: gestión de usuarios por el staff (validar premium).
@Injectable({ providedIn: 'root' })
export class Userservice {
  private url = `${enviroment.base}/users`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }

  misDatos() {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  togglePremium(id: number) {
    return this.http.put(`${this.url}/${id}/premium`, {}, { responseType: 'text' });
  }
}
