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
import { User } from '../../Models/user';

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

    let Checklist: User[] = [
      { idUser: 1, emailUser: "", usernameUser: "", is_enabledUser: true },
      { idUser: 1, emailUser: "", usernameUser: "", is_enabledUser: true },
      { idUser: 1, emailUser: "", usernameUser: "", is_enabledUser: true }
    ];

    const alternarTarea = (id: number): User[] => {
  return Checklist.map((tarea) => 
    tarea.idUser === id ? { ...tarea, completado: !tarea.is_enabledUser } : tarea
  );
};

Checklist = alternarTarea(2);

const tareasPendientes = Checklist.filter(tarea => !tarea.is_enabledUser).length;
console.log(`Tareas pendientes: ${tareasPendientes}`);

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
