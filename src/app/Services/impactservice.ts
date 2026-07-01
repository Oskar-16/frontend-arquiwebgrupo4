import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Impact } from '../Models/impact';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({ providedIn: 'root' })
export class Impactservice {
  private url = `${enviroment.base}/impact`;

  constructor(private http: HttpClient) {}

  // HU08: impacto ambiental del usuario autenticado
  miImpacto() {
    return this.http.get<Impact>(`${this.url}/me`);
  }

  // HU08: impacto agregado de la comunidad (endpoint público)
  comunidad() {
    return this.http.get<Impact>(`${this.url}/community`);
  }
}
