import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating, RatingRequest } from '../Models/rating';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({ providedIn: 'root' })
export class Ratingservice {
  private url = `${enviroment.base}/ratings`;

  constructor(private http: HttpClient) {}

  porUsuario(userId: number) {
    return this.http.get<Rating[]>(`${this.url}/user/${userId}`);
  }

  porTrade(tradeId: number) {
    return this.http.get<Rating[]>(`${this.url}/trade/${tradeId}`);
  }

  crear(dto: RatingRequest) {
    return this.http.post<Rating>(this.url, dto);
  }
}
