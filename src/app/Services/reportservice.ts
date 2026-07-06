import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report, ReportRequest } from '../Models/report';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({ providedIn: 'root' })
export class Reportservice {
  private url = `${enviroment.base}/reports`;

  constructor(private http: HttpClient) {}

  crear(dto: ReportRequest) {
    return this.http.post<Report>(this.url, dto);
  }

  listar() {
    return this.http.get<Report[]>(this.url);
  }

  porUsuario(userId: number) {
    return this.http.get<Report[]>(`${this.url}/user/${userId}`);
  }

  // cambia el estado del reporte (moderacion)
  cambiarEstado(id: number, status: string) {
    return this.http.put(`${this.url}/${id}/status`, { status });
  }
}
