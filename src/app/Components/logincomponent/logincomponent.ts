import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../Models/LoginRequest';
import { RegisterRequest } from '../../Models/RegisterRequest';

@Component({
  selector: 'app-logincomponent',
  imports: [
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class Logincomponent {
  // Login
  credenciales: LoginRequest = new LoginRequest();
  cargandoLogin = false;
  errorLogin = '';
  ocultarPasswordLogin = true;

  // Registro
  datos: RegisterRequest = new RegisterRequest();
  cargandoRegistro = false;
  errorRegistro = '';
  exitoRegistro = false;
  ocultarPasswordRegistro = true;

  // Tab activo (0 = login, 1 = registro)
  tabActivo = 0;

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(): void {
    this.errorLogin = '';
    this.cargandoLogin = true;

    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        this.authService.guardarToken(respuesta.token);
        this.cargandoLogin = false;
        this.router.navigate(['/homes']);
      },
      error: (err) => {
        this.cargandoLogin = false;
        if (err.status === 401) {
          this.errorLogin = 'Credenciales incorrectas.';
        } else if (err.status === 403) {
          this.errorLogin = 'Cuenta deshabilitada.';
        } else {
          this.errorLogin = 'Error al conectar con el servidor. Intenta de nuevo.';
        }
      }
    });
  }

  registrarse(): void {
    this.errorRegistro = '';
    this.cargandoRegistro = true;

    this.authService.registrar(this.datos).subscribe({
      next: () => {
        this.cargandoRegistro = false;
        this.exitoRegistro = true;
        // Tras registrar, pasar a la pestaña de login para iniciar sesión
        setTimeout(() => {
          this.exitoRegistro = false;
          this.tabActivo = 0;
        }, 1500);
      },
      error: (err) => {
        this.cargandoRegistro = false;
        if (err.status === 400) {
          this.errorRegistro = typeof err.error === 'string' ? err.error : 'No se pudo completar el registro.';
        } else {
          this.errorRegistro = 'Error al conectar con el servidor. Intenta de nuevo.';
        }
      }
    });
  }
}
