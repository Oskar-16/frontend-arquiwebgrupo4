import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Premiumservice } from '../../Services/premiumservice';

// HU06: página para contratar el plan premium (pago simulado).
@Component({
  selector: 'app-premiumcomponent',
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './premiumcomponent.html',
  styleUrl: './premiumcomponent.css',
})
export class Premiumcomponent {
  pago = { nombre: '', tarjeta: '', vencimiento: '', cvv: '' };
  procesando = false;
  activado = false;
  error = '';

  constructor(private premiumS: Premiumservice) {}

  pagar(): void {
    if (!this.pago.nombre.trim() || this.pago.tarjeta.replace(/\s/g, '').length < 12) {
      this.error = 'Completa los datos de la tarjeta.';
      return;
    }
    this.error = '';
    this.procesando = true;
    this.premiumS.suscribir().subscribe({
      next: () => {
        this.procesando = false;
        this.activado = true;
      },
      error: () => {
        this.procesando = false;
        this.error = 'No se pudo activar el premium. Intenta de nuevo.';
      },
    });
  }
}
