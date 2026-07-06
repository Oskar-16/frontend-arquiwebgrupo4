import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Report } from '../../Models/report';
import { Reportservice } from '../../Services/reportservice';

// Moderacion de reportes de abuso (admin)
@Component({
  selector: 'app-moderacioncomponent',
  imports: [CommonModule, MatTableModule, MatIconModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './moderacioncomponent.html',
  styleUrl: './moderacioncomponent.css',
})
export class Moderacioncomponent implements OnInit {
  dataSource: MatTableDataSource<Report> = new MatTableDataSource();
  displayedColumns: string[] = ['motivo', 'descripcion', 'reportado', 'estado', 'fecha', 'accion'];
  estados = ['PENDING', 'REVIEWED', 'RESOLVED'];

  constructor(private rS: Reportservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.rS.listar().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        // detectChanges forzado: ver comentario en adminpremiumcomponent.ts.
        this.cdr.detectChanges();
      },
    });
  }

  cambiar(r: Report, status: string) {
    this.rS.cambiarEstado(r.idReport, status).subscribe({
      next: () => this.cargar(),
      error: () => alert('No se pudo actualizar el estado del reporte.'),
    });
  }
}
