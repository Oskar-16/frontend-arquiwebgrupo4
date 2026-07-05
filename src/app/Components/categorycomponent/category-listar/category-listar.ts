import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Category } from '../../../Models/category';
import { Categoryservice } from '../../../Services/categoryservice';

@Component({
  selector: 'app-category-listar',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './category-listar.html',
  styleUrl: './category-listar.css',
})
export class CategoryListar implements OnInit{
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4'];
  error = '';
  constructor(private cS:Categoryservice, private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.cargarCategories();
  }
  cargarCategories(){
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
    });
  }
  eliminar(id: number) {
    this.error = '';
    this.cS.eliminar(id).subscribe({
      next: () => this.cargarCategories(),
      error: (err) => (this.error = typeof err?.error === 'string' ? err.error : 'No se pudo eliminar la categoría.'),
    });
  }
}
