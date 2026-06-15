import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Item } from '../../../Models/item';
import { Itemservice } from '../../../Services/itemservice';

@Component({
  selector: 'app-item-listar',
  imports: [MatTableModule,MatIconModule,MatButtonModule, RouterLink],
  templateUrl: './item-listar.html',
  styleUrl: './item-listar.css',
})
export class ItemListar implements OnInit{
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9'];


  constructor(private iS: Itemservice) {}
  ngOnInit(): void {
    this.cargarItems();
  }
  cargarItems() {
    this.iS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.iS.eliminar(id).subscribe((data) => {

      this.iS.list().subscribe((data) => {
        this.dataSource.data = data;
        
      });
    });
  }

}
