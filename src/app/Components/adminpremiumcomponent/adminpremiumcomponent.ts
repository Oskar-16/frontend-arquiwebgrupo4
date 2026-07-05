import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Userservice, Usuario } from '../../Services/userservice';

// HU07: el staff revisa los usuarios y valida (activa/quita) el premium.
@Component({
  selector: 'app-adminpremiumcomponent',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './adminpremiumcomponent.html',
  styleUrl: './adminpremiumcomponent.css',
})
export class Adminpremiumcomponent implements OnInit {
  usuarios: Usuario[] = [];
  error = '';

  constructor(private userS: Userservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.userS.listar().subscribe({
      next: (data) => {
        this.usuarios = data ?? [];
        // detectChanges forzado: un NG0100 disparado en otro lado de la app (ver
        // app.config.ts) puede abortar el tick automático a mitad de camino y dejar
        // la tabla sin pintar aunque los datos ya llegaron. Un segundo click (que
        // abre un tick nuevo y limpio) "arreglaba" esto, pero no debería depender de eso.
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de usuarios.';
        this.cdr.detectChanges();
      },
    });
  }

  toggle(u: Usuario): void {
    this.error = '';
    this.userS.togglePremium(u.idUser).subscribe({
      next: () => this.cargar(),
      error: (err) => {
        this.error = typeof err?.error === 'string' ? err.error : 'No se pudo actualizar el premium.';
        this.cdr.detectChanges();
      },
    });
  }
}
