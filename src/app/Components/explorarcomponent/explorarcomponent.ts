import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Itemservice } from '../../Services/itemservice';
import { Categoryservice } from '../../Services/categoryservice';
import { SearchService } from '../../Services/search.service';
import { ItemResponse } from '../../Models/item-response';
import { Category } from '../../Models/category';

@Component({
  selector: 'app-explorarcomponent',
  imports: [RouterLink, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './explorarcomponent.html',
  styleUrl: './explorarcomponent.css',
})
export class Explorarcomponent implements OnInit {
  private itemSrv = inject(Itemservice);
  private catSrv = inject(Categoryservice);
  private searchSrv = inject(SearchService);

  cargando = signal(true);
  items = signal<ItemResponse[]>([]);
  categorias = signal<Category[]>([]);
  categoriaSel = signal<number | null>(null); // null = "Todos"

  // El texto de búsqueda viene del navbar (SearchService).
  query = this.searchSrv.query;

  // Solo filtramos categoría en el cliente; el texto lo resuelve el backend (HU03).
  itemsFiltrados = computed(() => {
    const cat = this.categoriaSel();
    return this.items().filter((it) => cat === null || it.category?.idCategory === cat);
  });

  constructor() {
    // Cuando cambia el texto del buscador pedimos al backend; si está vacío, todos.
    effect(() => {
      const q = this.query().trim();
      if (q.length === 0) {
        this.cargarTodos();
      } else {
        this.itemSrv.buscar(q).subscribe({
          next: (r) => {
            this.items.set(r ?? []);
            this.cargando.set(false);
          },
          error: () => this.cargando.set(false),
        });
      }
    });
  }

  ngOnInit(): void {
    this.catSrv.list().subscribe({ next: (c) => this.categorias.set(c ?? []) });
  }

  private cargarTodos(): void {
    this.itemSrv.listResponse().subscribe({
      next: (items) => {
        this.items.set(items ?? []);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  seleccionarCategoria(id: number | null): void {
    this.categoriaSel.set(id);
  }

  estadoTexto(s: number): string {
    return s === 1 ? 'Disponible' : s === 2 ? 'Pausado' : s === 3 ? 'Intercambiado' : '—';
  }

  estadoClase(s: number): string {
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
