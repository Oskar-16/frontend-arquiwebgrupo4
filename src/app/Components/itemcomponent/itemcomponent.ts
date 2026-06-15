import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ItemListar } from './item-listar/item-listar';


@Component({
  selector: 'app-itemcomponent',
  imports: [RouterOutlet,ItemListar],
  templateUrl: './itemcomponent.html',
  styleUrl: './itemcomponent.css',
})
export class Itemcomponent {
  constructor(public route:ActivatedRoute){}
}
