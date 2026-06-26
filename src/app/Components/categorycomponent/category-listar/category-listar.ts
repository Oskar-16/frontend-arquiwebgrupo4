import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(private cS:Categoryservice){}
  ngOnInit(): void {
    this.cargarCategories();
  }
  cargarCategories(){
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminar(id: number) {
    this.cS.eliminar(id).subscribe(() => {
      this.cargarCategories();
    });
  }
}
