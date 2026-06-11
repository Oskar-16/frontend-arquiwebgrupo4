import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-layoutcomponent',
  imports: [RouterOutlet, Menucomponent],
  templateUrl: './layoutcomponent.html',
  styleUrl: './layoutcomponent.css'
})
export class Layoutcomponent {}
