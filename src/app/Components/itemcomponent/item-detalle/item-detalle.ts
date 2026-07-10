import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Itemservice } from '../../../Services/itemservice';
import { Tradeservice } from '../../../Services/tradeservice';
import { AuthService } from '../../../Services/auth.service';
import { ItemResponse } from '../../../Models/item-response';

@Component({
  selector: 'app-item-detalle',
  imports: [
    RouterLink, CommonModule, FormsModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './item-detalle.html',
  styleUrl: './item-detalle.css',
})
export class ItemDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private itemSrv = inject(Itemservice);
  private tradeSrv = inject(Tradeservice);
  private authSrv = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  cargando = signal(true);
  item = signal<ItemResponse | null>(null);

  misItems = signal<ItemResponse[]>([]);
  mostrarFormTrueque = signal(false);
  proposerItemIds: number[] = [];
  enviandoTrueque = signal(false);
  truequeMensaje = signal('');
  truequeError = signal('');

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

  abrirFormTrueque(): void {
    this.mostrarFormTrueque.set(true);
    this.truequeMensaje.set('');
    this.truequeError.set('');
    this.proposerItemIds = [];
    const miEmail = this.authSrv.obtenerEmail();
    this.itemSrv.listPaged(0, 1000).subscribe({
      next: (resp) => {
        const items: ItemResponse[] = resp.content ?? [];
        this.misItems.set(
          items.filter((i) => i.user?.emailUser === miEmail && i.statusItem === 1),
        );
        this.cdr.detectChanges();
      },
    });
  }

  cerrarFormTrueque(): void {
    this.mostrarFormTrueque.set(false);
  }

  toggleProposerItem(id: number): void {
    const idx = this.proposerItemIds.indexOf(id);
    if (idx >= 0) this.proposerItemIds.splice(idx, 1);
    else this.proposerItemIds.push(id);
  }

  seleccionado(id: number): boolean {
    return this.proposerItemIds.includes(id);
  }

  proponerTrueque(): void {
    const it = this.item();
    if (!it?.user?.idUser || !this.proposerItemIds.length) {
      this.truequeError.set('Selecciona al menos un item tuyo para ofrecer.');
      return;
    }
    this.enviandoTrueque.set(true);
    this.tradeSrv.crear({
      receiverId: it.user.idUser,
      proposerItemIds: this.proposerItemIds,
      receiverItemIds: [it.idItem],
    }).subscribe({
      next: () => {
        this.truequeMensaje.set('Propuesta enviada correctamente.');
        this.enviandoTrueque.set(false);
        this.mostrarFormTrueque.set(false);
      },
      error: (err) => {
        this.truequeError.set(typeof err?.error === 'string' ? err.error : 'Error al enviar la propuesta.');
        this.enviandoTrueque.set(false);
      }
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
