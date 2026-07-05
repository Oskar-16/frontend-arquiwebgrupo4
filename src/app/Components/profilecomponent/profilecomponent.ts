import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Profile } from '../../Models/profile';
import { Rating } from '../../Models/rating';
import { Profileservice } from '../../Services/profileservice';
import { Ratingservice } from '../../Services/ratingservice';

@Component({
  selector: 'app-profilecomponent',
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatTabsModule
  ],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css',
})
export class Profilecomponent implements OnInit {
  perfil = signal<Profile | null>(null);
  ratings = signal<Rating[]>([]);
  editando = signal(false);
  cargando = signal(true);
  error = signal('');
  exito = signal('');

  form: Partial<Profile> = {};

  constructor(
    private profileSrv: Profileservice,
    private ratingSrv: Ratingservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando.set(true);
    this.profileSrv.miPerfil().subscribe({
      next: (p) => {
        this.perfil.set(p);
        this.form = { ...p };
        this.cargando.set(false);
        this.cargarRatings(p.userId);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('No tienes perfil creado aún.');
      }
    });
  }

  cargarRatings(userId: number): void {
    this.ratingSrv.porUsuario(userId).subscribe({
      next: (r) => this.ratings.set(r),
      error: () => {}
    });
  }

  iniciarEdicion(): void {
    this.form = { ...this.perfil()! };
    this.editando.set(true);
    this.exito.set('');
    this.error.set('');
  }

  cancelarEdicion(): void {
    this.editando.set(false);
  }

  guardar(): void {
    const p = this.perfil();
    const accion = p
      ? this.profileSrv.actualizar(p.idProfile, this.form)
      : this.profileSrv.crear(this.form);

    accion.subscribe({
      next: (actualizado) => {
        this.perfil.set(actualizado);
        this.editando.set(false);
        this.exito.set('Perfil actualizado.');
        this.error.set('');
        // detectChanges forzado: el tick automático de zone.js puede abortar a mitad
        // de camino por el NG0100 que dispara mat-tab-group (ver app.config.ts), y
        // eso dejaba el mensaje sin pintar aunque el estado sí cambiaba.
        this.cdr.detectChanges();
      },
      error: () => {
        this.error.set('Error al guardar el perfil.');
        this.cdr.detectChanges();
      }
    });
  }

  promedioRating(): string {
    const r = this.ratings();
    if (!r.length) return '—';
    const avg = r.reduce((a, b) => a + b.score, 0) / r.length;
    return avg.toFixed(1);
  }

  estrellas(score: number): string {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  }

  iniciales(): string {
    const p = this.perfil();
    if (!p) return 'U';
    return ((p.firstName?.[0] ?? '') + (p.lastName?.[0] ?? '')).toUpperCase() || 'U';
  }
}
