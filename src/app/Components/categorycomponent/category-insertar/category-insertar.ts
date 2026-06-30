import { Category } from './../../../Models/category';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Categoryservice } from '../../../Services/categoryservice';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-category-insertar',
  imports: [CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule, MatIconModule,
    ReactiveFormsModule],
  templateUrl: './category-insertar.html',
  styleUrl: './category-insertar.css',
  providers: [provideNativeDateAdapter()],
})
export class CategoryInsertar implements OnInit {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  form: FormGroup = new FormGroup({});
  categoria: Category = new Category();
  enviando = false;
  error = '';

  constructor(
    private cS: Categoryservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      parent_id: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      ((this.categoria.nameCategory = this.form.value.nombre));
      (this.categoria.parent_idCategory = this.form.value.parent_id);
      this.enviando = true;
      this.error = '';
      this.cS.insert(this.categoria).subscribe({
        next: () => {
          this.router.navigate(['/categories/listar']);
        },
        error: (err) => {
          this.enviando = false;
          this.error = err?.error ?? 'No se pudo ingresar la categoria';
        },
      });
    }
  }

}
