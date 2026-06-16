import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homecomponent } from "./components/homecomponent/homecomponent";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Homecomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('verificacionkyc');
}
