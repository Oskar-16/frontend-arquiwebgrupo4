import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../Models/LoginRequest';

@Component({
  selector: 'app-logincomponent',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
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
  credenciales: LoginRequest = new LoginRequest();
  cargando = false;
  error = '';
  ocultarPassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(): void {
    this.error = '';
    this.cargando = true;

    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        this.authService.guardarToken(respuesta.token);
        this.cargando = false;
        this.router.navigate(['/homes']);
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 401) {
          this.error = 'Credenciales incorrectas.';
        } else if (err.status === 403) {
          this.error = 'Cuenta deshabilitada.';
        } else {
          this.error = 'Error al conectar con el servidor. Intenta de nuevo.';
        }
      }
    });
  }
}
