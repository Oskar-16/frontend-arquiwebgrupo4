import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../../Models/item-request';
import { Category } from '../../../Models/category';
import { Itemservice } from '../../../Services/itemservice';
import { Categoryservice } from '../../../Services/categoryservice';

const CONDICIONES = [
  { valor: 1, etiqueta: 'Nuevo' },
  { valor: 2, etiqueta: 'Como nuevo' },
  { valor: 3, etiqueta: 'Buen estado' },
  { valor: 4, etiqueta: 'Usado' },
];

@Component({
  selector: 'app-item-insertar',
  imports: [CommonModule, RouterLink, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './item-insertar.html',
  styleUrl: './item-insertar.css',
})
export class ItemInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  categorias: Category[] = [];
  condiciones = CONDICIONES;
  enviando = false;
  error = '';

  constructor(
    private iS: Itemservice,
    private cS: Categoryservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      condicion: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    this.cS.list().subscribe({ next: (data) => (this.categorias = data) });
  }

  aceptar() {
    if (!this.form.valid) return;

    const item = new Item();
    item.titleItem = this.form.value.titulo;
    item.descriptionItem = this.form.value.descripcion;
    item.conditionItem = Number(this.form.value.condicion);
    item.statusItem = 1;
    item.categoryId = Number(this.form.value.categoria);

    this.enviando = true;
    this.error = '';
    this.iS.insert(item).subscribe({
      next: () => this.router.navigate(['/items/listaritem']),
      error: (err) => {
        this.enviando = false;
        this.error = err?.error ?? 'No se pudo publicar el item.';
      },
    });
  }
}
