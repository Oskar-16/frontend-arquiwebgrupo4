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
import { RegisterRequest } from '../../Models/RegisterRequest';

@Component({
  selector: 'app-registrocomponent',
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
  templateUrl: './registrocomponent.html',
  styleUrl: './registrocomponent.css'
})
export class Registrocomponent {
  datos: RegisterRequest = new RegisterRequest();
  cargando = false;
  error = '';
  exito = false;
  ocultarPassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  registrarse(): void {
    this.error = '';
    this.cargando = true;

    this.authService.registrar(this.datos).subscribe({
      next: () => {
        this.cargando = false;
        this.exito = true;
        // Tras registrar, llevar al login para iniciar sesión
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 400) {
          // El backend devuelve el mensaje de error como texto (ej. "Email ya registrado")
          this.error = typeof err.error === 'string' ? err.error : 'No se pudo completar el registro.';
        } else {
          this.error = 'Error al conectar con el servidor. Intenta de nuevo.';
        }
      }
    });
  }
}
