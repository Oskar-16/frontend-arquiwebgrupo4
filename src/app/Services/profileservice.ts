import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../Models/profile';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({ providedIn: 'root' })
export class Profileservice {
  private url = `${enviroment.base}/profiles`;

  constructor(private http: HttpClient) {}

  miPerfil() {
    return this.http.get<Profile>(`${this.url}/me`);
  }

  porUsuario(userId: number) {
    return this.http.get<Profile>(`${this.url}/user/${userId}`);
  }

  crear(dto: Partial<Profile>) {
    return this.http.post<Profile>(this.url, dto);
  }

  actualizar(id: number, dto: Partial<Profile>) {
    return this.http.put<Profile>(`${this.url}/${id}`, dto);
  }
}
