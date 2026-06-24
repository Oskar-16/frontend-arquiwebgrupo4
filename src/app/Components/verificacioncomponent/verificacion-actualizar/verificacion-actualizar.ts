import { Component, OnInit } from '@angular/core';
import { Verificacion } from '../../../Models/verificacion';
import { Verificacionservice } from '../../../Services/verificacionservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-verificacion-actualizar',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './verificacion-actualizar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './verificacion-actualizar.css',
})
export class VerificacionActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  ver: Verificacion = new Verificacion();
  id: number = 0;

  estados: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Pendiente' },
    { value: 2, viewValue: 'Verificado' },
  ];
  constructor(
    private vS: Verificacionservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      correo: ['', Validators.required],
      documento: ['', Validators.required],
      registro: ['', Validators.required],
      estado: ['', Validators.required],
      observacion: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.ver.idUser = this.form.value.id;
      this.ver.emailUser = this.form.value.correo;
      this.ver.usernameUser = this.form.value.documento;
      this.ver.created_atUser = this.form.value.registro;
      this.ver.is_verifiedUser = this.form.value.estado === 2;
      this.vS.update(this.ver).subscribe({
        next: () => {
          this.router.navigate(['/kyc/listar']);
        },
      });
    }
  }

  init() {
    this.vS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.idUser,
        correo: data.emailUser,
        documento: data.usernameUser,
        registro: data.created_atUser,
        estado: data.is_verifiedUser ? 2 : 1,
      });
    });
  }
}
