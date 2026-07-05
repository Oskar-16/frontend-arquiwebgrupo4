import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Trade } from '../../Models/trade';
import { Tradeservice } from '../../Services/tradeservice';

// HU21: el dueño de un item ve y compara todas las propuestas recibidas por ese item.
@Component({
  selector: 'app-ofertascomponent',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './ofertascomponent.html',
  styleUrl: './ofertascomponent.css',
})
export class Ofertascomponent implements OnInit {
  itemId = 0;
  ofertas: Trade[] = [];
  cargando = true;
  error = '';

  constructor(private route: ActivatedRoute, private tradeS: Tradeservice) {}

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
    this.cargar();
  }

  cargar(): void {
    this.tradeS.porItem(this.itemId).subscribe({
      next: (data) => {
        this.ofertas = data ?? [];
        this.cargando = false;
      },
      error: () => (this.cargando = false),
    });
  }

  textoItems(items: { titleItem: string }[]): string {
    return items.map((i) => i.titleItem).join(', ') || '—';
  }

  inicialesDe(nombre: string | undefined): string {
    return (nombre ?? '').slice(0, 2).toUpperCase();
  }

  estadoTexto(s: string): string {
    if (s === 'PENDING') return 'Pendiente';
    if (s === 'ACCEPTED') return 'Aceptado';
    if (s === 'REJECTED') return 'Rechazado';
    return 'Cancelado';
  }

  aceptar(t: Trade): void {
    this.error = '';
    this.tradeS.aceptar(t.idTrade).subscribe({
      next: () => this.cargar(),
      error: (err) => (this.error = typeof err?.error === 'string' ? err.error : 'No se pudo aceptar la oferta.'),
    });
  }

  rechazar(t: Trade): void {
    this.error = '';
    this.tradeS.rechazar(t.idTrade).subscribe({
      next: () => this.cargar(),
      error: (err) => (this.error = typeof err?.error === 'string' ? err.error : 'No se pudo rechazar la oferta.'),
    });
  }
}
