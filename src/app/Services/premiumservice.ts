import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../Enviroments/enviroments.developments';

// HU06: suscripción premium del propio usuario.
@Injectable({ providedIn: 'root' })
export class Premiumservice {
  private url = `${enviroment.base}/users`;

  constructor(private http: HttpClient) {}

  suscribir() {
    return this.http.put(`${this.url}/me/premium`, {}, { responseType: 'text' });
  }
}
