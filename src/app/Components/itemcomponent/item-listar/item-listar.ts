import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Item } from '../../../Models/item-request';
import { Itemservice } from '../../../Services/itemservice';
import { AuthService } from '../../../Services/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

const ICONOS_CATEGORIA: Record<string, string> = {
  tecnología: 'devices',
  tecnologia: 'devices',
  deportes: 'directions_bike',
  música: 'music_note',
  musica: 'music_note',
  hogar: 'chair',
  libros: 'menu_book',
};

const ESTADOS: Record<number, { texto: string; icono: string; clase: string }> = {
  1: { texto: 'Disponible', icono: 'check_circle', clase: 'estado-disponible' },
  2: { texto: 'Pausado', icono: 'pause_circle', clase: 'estado-pausado' },
  3: { texto: 'Intercambiado', icono: 'sync_alt', clase: 'estado-intercambiado' },
};

const LIMITE_PLAN_GRATUITO = 5;

@Component({
  selector: 'app-item-listar',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './item-listar.html',
  styleUrl: './item-listar.css',
})
export class ItemListar implements OnInit {
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  displayedColumns: string[] = ['item', 'categoria', 'estado', 'acciones'];
  limitePlan = LIMITE_PLAN_GRATUITO;

  todas: Item[] = [];
  filtradas: Item[] = [];
  paginadas: Item[] = [];

  filtroFecha: string = '';
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  pageIndex = 0;

  constructor(private iS: Itemservice, private authS: AuthService) {}

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems() {
    const email = this.authS.obtenerEmail();
    this.iS.list().subscribe({
      next: (data) => {
        this.dataSource.data = email
          ? data.filter((i) => i.user?.emailUser === email)
          : data;
          this.aplicarFiltro();
      },
    });
  }
  aplicarFiltro(): void {
    this.filtradas = this.filtroFecha
      ? this.todas.filter(v => v.titleItem === this.filtroFecha)
      : this.todas;
    this.pageIndex = 0;
    this.actualizarPagina();
  }

  actualizarPagina(): void {
    const inicio = this.pageIndex * this.pageSize;
    this.paginadas = this.filtradas.slice(inicio, inicio + this.pageSize);
  }

  cambiarPagina(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarPagina();
  }

  get itemsActivos(): number {
    return this.dataSource.data.filter((i) => i.statusItem === 1).length;
  }

  iconoCategoria(item: Item): string {
    const nombre = item.category?.nameCategory?.toLowerCase() ?? '';
    return ICONOS_CATEGORIA[nombre] ?? 'inventory_2';
  }

  estadoDe(item: Item) {
    return ESTADOS[item.statusItem] ?? ESTADOS[1];
  }

  eliminar(id: number) {
    this.iS.eliminar(id).subscribe(() => {
      this.cargarItems();
    });
  }
}
