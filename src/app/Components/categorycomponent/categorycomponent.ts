import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CategoryListar } from './category-listar/category-listar';

@Component({
  selector: 'app-categorycomponent',
  imports: [RouterOutlet,CategoryListar],
  templateUrl: './categorycomponent.html',
  styleUrl: './categorycomponent.css',
})
export class Categorycomponent {
  constructor(public route:ActivatedRoute){}
}
