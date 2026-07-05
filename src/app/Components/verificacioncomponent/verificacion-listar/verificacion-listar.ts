import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Verificacion } from '../../../Models/verificacion';
import { Verificacionservice } from '../../../Services/verificacionservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private vS: Verificacionservice, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cargarVerificaciones();
  }

  cargarVerificaciones() {
    this.vS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        // detectChanges forzado: ver comentario en adminpremiumcomponent.ts.
        this.cdr.detectChanges();
      },
    });
  }

  // Deshabilitar/habilitar (soft-delete real: no rompe FKs como el DELETE crudo).
  alternarHabilitado(u: Verificacion) {
    const accion = u.is_enabledUser
      ? this.vS.deshabilitar(u.idUser)
      : this.vS.habilitar(u.idUser);
    accion.subscribe({
      next: () => this.cargarVerificaciones(),
      error: () => alert('No se pudo actualizar el estado del usuario.'),
    });
  }
}
