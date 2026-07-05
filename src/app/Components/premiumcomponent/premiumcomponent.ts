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

  private validarPago(): string {
    if (!this.pago.nombre.trim()) {
      return 'Ingresa el nombre en la tarjeta.';
    }
    const numero = this.pago.tarjeta.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(numero)) {
      return 'Número de tarjeta inválido (13 a 19 dígitos).';
    }
    const venc = this.pago.vencimiento.trim();
    const match = /^(\d{2})\/(\d{2})$/.exec(venc);
    if (!match) {
      return 'Vencimiento inválido (formato MM/AA).';
    }
    const mes = Number(match[1]);
    const anio = 2000 + Number(match[2]);
    if (mes < 1 || mes > 12) {
      return 'Mes de vencimiento inválido.';
    }
    const finDeMes = new Date(anio, mes, 0);
    if (finDeMes < new Date()) {
      return 'La tarjeta está vencida.';
    }
    if (!/^\d{3,4}$/.test(this.pago.cvv.trim())) {
      return 'CVV inválido (3 o 4 dígitos).';
    }
    return '';
  }

  pagar(): void {
    const validacion = this.validarPago();
    if (validacion) {
      this.error = validacion;
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
