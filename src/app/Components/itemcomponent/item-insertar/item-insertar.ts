import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Item } from '../../../Models/item';
import { Itemservice } from '../../../Services/itemservice';

@Component({
  selector: 'app-item-insertar',
  imports: [    MatInputModule, 
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './item-insertar.html',
  styleUrl: './item-insertar.css',
  providers: [provideNativeDateAdapter()],

})
export class ItemInsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  aut:Item=new Item;
  constructor(
    private iS: Itemservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      condicion: ['', Validators.required],
      status: ['', Validators.required],
      user: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      (
        (this.aut.titleItem = this.form.value.titulo),
        (this.aut.descriptionItem = this.form.value.descripcion));
      this.aut.conditionItem = this.form.value.condicion;
      this.aut.statusItem = this.form.value.status;
      this.aut.user = this.form.value.user;
      this.aut.category = this.form.value.categoria;
      this.iS.insert(this.aut).subscribe({
        next: () => {
          this.router.navigate(['/item/insertar']);
        },
      });
    }
}}
