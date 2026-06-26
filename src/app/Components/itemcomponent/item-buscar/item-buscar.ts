import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Item } from '../../../Models/item-request';
import { Category } from '../../../Models/category';
import { Itemservice } from '../../../Services/itemservice';
import { Categoryservice } from '../../../Services/categoryservice';

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
  selector: 'app-item-buscar',
  imports: [CommonModule, FormsModule, MatIconModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './item-buscar.html',
  styleUrl: './item-buscar.css',
})
export class ItemBuscar implements OnInit {
  items: Item[] = [];
  categorias: Category[] = [];
  busqueda = '';
  categoriaSeleccionada: number | 'todos' = 'todos';

  constructor(private iS: Itemservice, private cS: Categoryservice) {}

  ngOnInit(): void {
    this.iS.list().subscribe({ next: (data) => (this.items = data) });
    this.cS.list().subscribe({ next: (data) => (this.categorias = data) });
  }

  get resultados(): Item[] {
    const texto = this.busqueda.trim().toLowerCase();
    return this.items.filter((i) => {
      const matchTexto = !texto || i.titleItem.toLowerCase().includes(texto);
      const matchCategoria =
        this.categoriaSeleccionada === 'todos' ||
        i.category?.idCategory === this.categoriaSeleccionada;
      return matchTexto && matchCategoria;
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
    return (item.user?.usernameUser ?? '').slice(0, 2).toUpperCase();
  }
}
