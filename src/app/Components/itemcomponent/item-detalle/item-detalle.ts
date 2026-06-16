import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Itemservice } from '../../../Services/itemservice';
import { ItemResponse } from '../../../Models/item-response';

@Component({
  selector: 'app-item-detalle',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './item-detalle.html',
  styleUrl: './item-detalle.css',
})
export class ItemDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private itemSrv = inject(Itemservice);

  cargando = signal(true);
  item = signal<ItemResponse | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemSrv.listIdResponse(id).subscribe({
      next: (it) => {
        this.item.set(it);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  estadoTexto(s?: number): string {
    return s === 1 ? 'Disponible' : s === 2 ? 'Pausado' : s === 3 ? 'Intercambiado' : '—';
  }

  estadoClase(s?: number): string {
    return s === 1 ? 'estado-disponible' : s === 2 ? 'estado-pausado' : 'estado-intercambiado';
  }

  iconoCategoria(nombre?: string): string {
    const n = (nombre ?? '').toLowerCase();
    if (n.includes('tecno')) return 'devices';
    if (n.includes('deporte')) return 'pedal_bike';
    if (n.includes('music')) return 'music_note';
    if (n.includes('hogar')) return 'chair';
    if (n.includes('libro')) return 'menu_book';
    return 'category';
  }

  nombreDueno(it: ItemResponse): string {
    const p = it.user?.profile;
    if (p && (p.firstName || p.lastName)) return `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim();
    return it.user?.usernameUser ?? 'Usuario';
  }

  iniciales(it: ItemResponse): string {
    const partes = this.nombreDueno(it).split(' ').filter(Boolean);
    const ini = (partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '');
    return ini.toUpperCase() || 'U';
  }
}
