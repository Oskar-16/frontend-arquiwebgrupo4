import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Category } from '../../../Models/category';
import { Categoryservice } from '../../../Services/categoryservice';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-listar',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './category-listar.html',
  styleUrl: './category-listar.css',
})
export class CategoryListar implements OnInit{
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4'];
  todas: Category[] = [];
  filtradas: Category[] = [];
  paginadas: Category[] = [];

  filtroFecha: string = '';
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  pageIndex = 0;

  constructor(private cS:Categoryservice){}
  ngOnInit(): void {
    this.cargarCategories();
  }
  cargarCategories(){
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.aplicarFiltro();
      },
    });
  }
  aplicarFiltro(): void {
    this.filtradas = this.filtroFecha
      ? this.todas.filter(v => v.nameCategory === this.filtroFecha)
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
    this.cS.eliminar(id).subscribe(() => {
      this.cargarCategories();
    });
  }
}
