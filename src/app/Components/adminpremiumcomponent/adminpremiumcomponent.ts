import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Userservice, Usuario } from '../../Services/userservice';

// HU07: el staff revisa los usuarios y valida (activa/quita) el premium.
@Component({
  selector: 'app-adminpremiumcomponent',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './adminpremiumcomponent.html',
  styleUrl: './adminpremiumcomponent.css',
})
export class Adminpremiumcomponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private userS: Userservice) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.userS.listar().subscribe({ next: (data) => (this.usuarios = data ?? []) });
  }

  toggle(u: Usuario): void {
    this.userS.togglePremium(u.idUser).subscribe({ next: () => this.cargar() });
  }
}
