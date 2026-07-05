import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Verificacion } from '../../../Models/verificacion';
import { Verificacionservice } from '../../../Services/verificacionservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// KYC: el backend solo soporta "verificar" (PUT /users/{id}/verify, siempre pone
// is_verifiedUser=true). No existe un endpoint para revertir la verificación, así
// que este formulario no debe fingir que se puede editar correo/documento/fecha ni
// volver a "Pendiente" — eso nunca se guardaba de verdad (ver auditoría 2026-07-05).
@Component({
  selector: 'app-verificacion-actualizar',
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './verificacion-actualizar.html',
  styleUrl: './verificacion-actualizar.css',
})
export class VerificacionActualizar implements OnInit {
  id = 0;
  usuario = signal<Verificacion | null>(null);
  cargando = signal(true);
  actualizando = signal(false);
  error = signal('');

  constructor(
    private vS: Verificacionservice,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.vS.listId(this.id).subscribe({
      next: (data) => {
        this.usuario.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el usuario.');
        this.cargando.set(false);
      },
    });
  }

  verificar(): void {
    this.actualizando.set(true);
    this.error.set('');
    const v = new Verificacion();
    v.idUser = this.id;
    this.vS.update(v).subscribe({
      next: () => this.router.navigate(['/kyc/listar']),
      error: () => {
        this.actualizando.set(false);
        this.error.set('No se pudo verificar al usuario.');
      },
    });
  }
}
