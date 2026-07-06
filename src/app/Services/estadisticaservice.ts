import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conteo } from '../Models/conteo';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({ providedIn: 'root' })
export class Estadisticaservice {
  private url = `${enviroment.base}/estadisticas`;

  constructor(private http: HttpClient) {}

  itemsPorCategoria() {
    return this.http.get<Conteo[]>(`${this.url}/items-por-categoria`);
  }

  truequesPorEstado() {
    return this.http.get<Conteo[]>(`${this.url}/trueques-por-estado`);
  }

  rankingUsuarios() {
    return this.http.get<Conteo[]>(`${this.url}/ranking-usuarios`);
  }
}
