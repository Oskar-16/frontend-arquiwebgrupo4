import { Component, OnInit } from '@angular/core';
import { Verificacion } from '../../../Models/verificacion';
import { Verificacionservice } from '../../../Services/verificacionservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-verificacion-listar',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './verificacion-listar.html',
  styleUrl: './verificacion-listar.css',
})
export class VerificacionListar implements OnInit {
  dataSource: MatTableDataSource<Verificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  todas: Verificacion[] = [];
  filtradas: Verificacion[] = [];
  paginadas: Verificacion[] = [];

  filtroFecha: string = '';
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  pageIndex = 0;

  constructor(private vS: Verificacionservice) {}
  ngOnInit(): void {
    this.cargarVerificaciones();
  }

  cargarVerificaciones() {
    this.vS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.aplicarFiltro();
      },
    });
  }

  aplicarFiltro(): void {
    this.filtradas = this.filtroFecha
      ? this.todas.filter(v => v.created_atUser === this.filtroFecha)
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

  eliminar(id: number) {
    this.vS.eliminar(id).subscribe((data) => {

      this.vS.list().subscribe((data) => {
        this.dataSource.data = data;

      });
    });
  }
}
