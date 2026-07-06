import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

import { LoginRequest } from '../Models/LoginRequest';
import { LoginResponse } from '../Models/LoginResponse';
import { RegisterRequest } from '../Models/RegisterRequest';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${enviroment.base}/auth`;
  private tokenKey = 'token';
  private esNavegador: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.esNavegador = isPlatformBrowser(platformId);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, request);
  }

  registrar(request: RegisterRequest): Observable<any> {
    return this.http.post(`${enviroment.base}/users`, request);
  }

  guardarToken(token: string): void {
    if (this.esNavegador) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  obtenerToken(): string | null {
    if (this.esNavegador) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  estaLogueado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp viene en segundos; false si ya expiró
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  logout(): void {
    if (this.esNavegador) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  obtenerEmail(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }

  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  esAdmin(): boolean {
    return this.obtenerRol() === 'ADMIN';
  }
}
