import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Item, ItemCategory } from '../../../Models/item-request';
import { Itemservice } from '../../../Services/itemservice';
import { Categoryservice } from '../../../Services/categoryservice';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../Models/category';
import { MatIconModule } from '@angular/material/icon';

const CONDICIONES = [
  { valor: 1, etiqueta: 'Nuevo' },
  { valor: 2, etiqueta: 'Como nuevo' },
  { valor: 3, etiqueta: 'Buen estado' },
  { valor: 4, etiqueta: 'Usado' },
];

@Component({
  selector: 'app-item-actualizar',
  imports: [CommonModule, RouterLink, MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './item-actualizar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './item-actualizar.css',
  
})
export class ItemActualizar implements OnInit {
  form: FormGroup;
  categorias: Category[] = [];
  condiciones = CONDICIONES;
  enviando = false;
  error = '';
  id: number = 0;
  private statusActual = 1;

  constructor(
    private iS: Itemservice,
    private cS: Categoryservice,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      condicion: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.init()
    })
    this.cS.list().subscribe({ next: (data) => (this.categorias = data) });
  }
  aceptar() {
    if (!this.form.valid) return;

    const item = new Item();
    item.titleItem = this.form.value.titulo;
    item.descriptionItem = this.form.value.descripcion;
    item.conditionItem = Number(this.form.value.condicion);
    item.statusItem = this.statusActual;
    item.categoryId = Number(this.form.value.categoria);

    this.enviando = true;
    this.error = '';
    this.iS.update(this.id,item).subscribe({
      next: () => {
        this.router.navigate(['/items/listaritem'])
      },
      error: (err) => {
        this.enviando = false;
        this.error = typeof err?.error === 'string' ? err.error : 'NO SE PUDO ACTUALIZAR TU ITEM. :(';
      },
    });
  }
  init(){
    this.iS.listId(this.id).subscribe({
      next: (data) => {
        this.statusActual = data.statusItem;
        this.form.patchValue({
          titulo:data.titleItem,
          descripcion:data.descriptionItem,
          condicion:data.conditionItem,
          categoria:data.category?.idCategory,
        })
      },
      error: () => { this.error = 'No se pudo cargar el ítem.'; },
    })
  }
}
