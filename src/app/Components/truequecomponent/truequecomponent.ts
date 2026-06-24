import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Trade } from '../../Models/trade';
import { Tradeservice } from '../../Services/tradeservice';

const ESTADOS: Record<string, string> = {
  PENDING: 'Pendiente',
  ACCEPTED: 'Aceptado',
  REJECTED: 'Rechazado',
  CANCELLED: 'Cancelado',
};

const CLASES: Record<string, string> = {
  PENDING: 'estado-pendiente',
  ACCEPTED: 'estado-aceptado',
  REJECTED: 'estado-rechazado',
  CANCELLED: 'estado-rechazado',
};

@Component({
  selector: 'app-truequecomponent',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTabsModule],
  templateUrl: './truequecomponent.html',
  styleUrl: './truequecomponent.css',
})
export class Truequecomponent implements OnInit {
  recibidos: Trade[] = [];
  enviados: Trade[] = [];

  constructor(private tradeS: Tradeservice) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.tradeS.recibidos().subscribe({ next: (data) => (this.recibidos = data) });
    this.tradeS.enviados().subscribe({ next: (data) => (this.enviados = data) });
  }

  inicialesDe(nombre: string | undefined): string {
    return (nombre ?? '').slice(0, 2).toUpperCase();
  }

  textoItems(items: { titleItem: string }[]): string {
    return items.map((i) => i.titleItem).join(', ') || '—';
  }

  estadoTexto(t: Trade): string {
    return ESTADOS[t.statusTrade] ?? t.statusTrade;
  }

  estadoClase(t: Trade): string {
    return CLASES[t.statusTrade] ?? 'estado-pendiente';
  }

  aceptar(t: Trade) {
    this.tradeS.aceptar(t.idTrade).subscribe({ next: () => this.cargar() });
  }

  rechazar(t: Trade) {
    this.tradeS.rechazar(t.idTrade).subscribe({ next: () => this.cargar() });
  }

  cancelar(t: Trade) {
    this.tradeS.cancelar(t.idTrade).subscribe({ next: () => this.cargar() });
  }
}
