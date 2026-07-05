import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Item } from '../../../Models/item-request';
import { Itemservice } from '../../../Services/itemservice';
import { AuthService } from '../../../Services/auth.service';
import { Userservice } from '../../../Services/userservice';

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
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './item-listar.html',
  styleUrl: './item-listar.css',
})
export class ItemListar implements OnInit {
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  displayedColumns: string[] = ['item', 'categoria', 'estado', 'acciones'];
  limitePlan = LIMITE_PLAN_GRATUITO;
  error = '';
  esPremium = false;

  constructor(
    private iS: Itemservice,
    private authS: AuthService,
    private userS: Userservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarItems();
    this.userS.misDatos().subscribe({
      next: (u) => {
        this.esPremium = !!u.is_premiumUser;
        this.cdr.detectChanges();
      },
      error: () => {}, // si falla, se asume plan gratuito (comportamiento previo)
    });
  }

  cargarItems() {
    const email = this.authS.obtenerEmail();
    this.iS.list().subscribe({
      next: (data) => {
        this.dataSource.data = email
          ? data.filter((i) => i.user?.emailUser === email)
          : data;
        this.cdr.detectChanges();
      },
    });
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
    this.error = '';
    this.iS.eliminar(id).subscribe({
      next: () => this.cargarItems(),
      error: (err) => (this.error = typeof err?.error === 'string' ? err.error : 'No se pudo eliminar el ítem.'),
    });
  }
}
