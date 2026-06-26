import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-menucomponent',
  imports: [MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule,RouterLink,RouterLinkActive],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}

  buscar(evento: Event): void {
    this.searchService.set((evento.target as HTMLInputElement).value);
  }

  esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
