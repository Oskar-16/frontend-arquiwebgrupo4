import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Itemservice } from '../../Services/itemservice';
import { CategoryService } from '../../Services/category.service';
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
  private catSrv = inject(CategoryService);
  private searchSrv = inject(SearchService);

  cargando = signal(true);
  items = signal<ItemResponse[]>([]);
  categorias = signal<Category[]>([]);
  categoriaSel = signal<number | null>(null); // null = "Todos"

  // El texto de búsqueda viene del navbar (SearchService).
  query = this.searchSrv.query;

  itemsFiltrados = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.categoriaSel();
    return this.items().filter((it) => {
      const okCat = cat === null || it.category?.idCategory === cat;
      const okQ = !q || (it.titleItem ?? '').toLowerCase().includes(q);
      return okCat && okQ;
    });
  });

  ngOnInit(): void {
    this.catSrv.list().subscribe({ next: (c) => this.categorias.set(c ?? []) });
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
