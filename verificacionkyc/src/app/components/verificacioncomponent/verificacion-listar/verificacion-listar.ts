import { Component, OnInit } from '@angular/core';
import { Verificacion } from '../../../models/Verificacion';
import { Verificacionservice } from '../../../services/verificacionservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-verificacion-listar',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './verificacion-listar.html',
  styleUrl: './verificacion-listar.css',
})
export class VerificacionListar implements OnInit {
  dataSource: MatTableDataSource<Verificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8'];

  constructor(private vS: Verificacionservice) {}
  ngOnInit(): void {
    this.cargarVerificaciones();
  }

  cargarVerificaciones() {
    this.vS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.vS.eliminar(id).subscribe((data) => {

      this.vS.list().subscribe((data) => {
        this.dataSource.data = data;
        
      });
    });
  }
}
