import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Verificacion } from '../../../models/Verificacion';
import { Verificacionservice } from '../../../services/verificacionservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-verificacion-insertar',
  imports: [
    MatInputModule, 
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './verificacion-insertar.html',
  providers: [provideNativeDateAdapter()],

  styleUrl: './verificacion-insertar.css',
})
export class VerificacionInsertar {
  form: FormGroup = new FormGroup({});
  ver: Verificacion = new Verificacion();
  estados: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Pendiente'},
    { value: 2, viewValue: 'Verificado'},
  ];

  constructor(
    private vS: Verificacionservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: ['', Validators.required],
      documento: ['', Validators.required],
      registro: ['', Validators.required],
      estado: ['', Validators.required],
      observacion: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      ((this.ver.emailUser = this.form.value.correo),
        (this.ver.usernameUser = this.form.value.documento));
      this.ver.createUser = this.form.value.registro;
      this.ver.verifiedUser = this.form.value.estado;
      this.ver.enableUser = this.form.value.observacion;
      this.vS.insert(this.ver).subscribe({
        next: () => {
          this.router.navigate(['/verificaciones/listar']);
        },
      });
    }
  }
}
