import { Category } from './../../../Models/category';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Categoryservice } from '../../../Services/categoryservice';


@Component({
  selector: 'app-category-actualizar',
  imports: [CommonModule, RouterLink, MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './category-actualizar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './category-actualizar.css',
})
export class CategoryActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  categorias: Category[] = [];
  enviando = false;
  error = '';
  id: number = 0//
  constructor(
    private cS: Categoryservice,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.init()
    })
    this.cS.list().subscribe({ next: (data) => (this.categorias = data) });
  }
  aceptar() {
    if (!this.form.valid) return;

    const categorias = new Category();
    categorias.nameCategory = this.form.value.nombre;
    categorias.parent_idCategory = Number(this.form.value.parent_id);
    this.enviando = true;
    this.error = '';
    this.cS.update(this.id, categorias).subscribe({
      next: () => {
        this.router.navigate(['/categories/actualizar'])
      },
      error: (err) => {
        this.enviando = false;
        this.error = err?.error ?? 'NO SE PUDO ACTUALIZAR TU CATEGORIA. :(';
      },
    })
  }
  init(){
    this.cS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        nombre:data.nameCategory,
        parent_id:data.parent_idCategory,
      })
    })
  }
  
}
