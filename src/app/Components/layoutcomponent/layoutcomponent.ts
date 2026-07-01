import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-layoutcomponent',
  imports: [CommonModule, RouterOutlet, Menucomponent, MatIconModule],
  templateUrl: './layoutcomponent.html',
  styleUrl: './layoutcomponent.css'
})
export class Layoutcomponent {
  // HU20: modal de bienvenida que se muestra solo en el primer ingreso.
  private readonly STORAGE_KEY = 'tutrade_guia_vista';
  mostrarBienvenida = false;
  private esNavegador: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.esNavegador = isPlatformBrowser(platformId);
    if (this.esNavegador && !localStorage.getItem(this.STORAGE_KEY)) {
      this.mostrarBienvenida = true;
    }
  }

  cerrarBienvenida(): void {
    this.mostrarBienvenida = false;
    if (this.esNavegador) {
      localStorage.setItem(this.STORAGE_KEY, '1');
    }
  }

  irAGuia(): void {
    this.cerrarBienvenida();
    this.router.navigate(['/guia']);
  }
}
