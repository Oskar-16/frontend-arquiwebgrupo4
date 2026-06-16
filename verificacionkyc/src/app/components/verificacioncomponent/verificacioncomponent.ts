import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VerificacionListar } from './verificacion-listar/verificacion-listar';

@Component({
  selector: 'app-verificacioncomponent',
  imports: [RouterOutlet, VerificacionListar],
  templateUrl: './verificacioncomponent.html',
  styleUrl: './verificacioncomponent.css',
})
export class Verificacioncomponent {

  constructor(public route:ActivatedRoute){}
}
