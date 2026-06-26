import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Models/item-request';
import { Category } from '../../Models/category';
import { Itemservice } from '../../Services/itemservice';
import { Categoryservice } from '../../Services/categoryservice';

const ICONOS_CATEGORIA: Record<string, string> = {
  tecnología: 'devices',
  tecnologia: 'devices',
  deportes: 'directions_bike',
  música: 'music_note',
  musica: 'music_note',
  hogar: 'chair',
  libros: 'menu_book',
};

const ESTADOS: Record<number, { texto: string; clase: string }> = {
  1: { texto: 'Disponible', clase: 'estado-disponible' },
  2: { texto: 'Pausado', clase: 'estado-pausado' },
  3: { texto: 'Intercambiado', clase: 'estado-intercambiado' },
};

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule, FormsModule, MatIconModule, MatChipsModule, MatCardModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent implements OnInit {
  items: Item[] = [];
  categorias: Category[] = [];
  categoriaSeleccionada: number | 'todos' = 'todos';
  busqueda = '';

  constructor(private iS: Itemservice, private cS: Categoryservice) {}

  ngOnInit(): void {
    this.iS.list().subscribe({ next: (data) => (this.items = data) });
    this.cS.list().subscribe({ next: (data) => (this.categorias = data) });
  }

  seleccionarCategoria(id: number | 'todos') {
    this.categoriaSeleccionada = id;
  }

  get itemsFiltrados(): Item[] {
    return this.items.filter((i) => {
      const matchCategoria =
        this.categoriaSeleccionada === 'todos' ||
        i.category?.idCategory === this.categoriaSeleccionada;
      const matchBusqueda = i.titleItem
        .toLowerCase()
        .includes(this.busqueda.trim().toLowerCase());
      return matchCategoria && matchBusqueda;
    });
  }

  iconoCategoria(item: Item): string {
    const nombre = item.category?.nameCategory?.toLowerCase() ?? '';
    return ICONOS_CATEGORIA[nombre] ?? 'inventory_2';
  }

  estadoDe(item: Item) {
    return ESTADOS[item.statusItem] ?? ESTADOS[1];
  }

  inicialesDe(item: Item): string {
    const nombre = item.user?.usernameUser ?? '';
    return nombre.slice(0, 2).toUpperCase();
  }
}
