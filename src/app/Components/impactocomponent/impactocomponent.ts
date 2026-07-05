import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Impactservice } from '../../Services/impactservice';
import { Impact } from '../../Models/impact';

@Component({
  selector: 'app-impactocomponent',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './impactocomponent.html',
  styleUrl: './impactocomponent.css',
})
export class Impactocomponent implements OnInit {
  impacto?: Impact;
  cargando = true;
  error = '';

  constructor(private impactService: Impactservice) {}

  ngOnInit(): void {
    this.impactService.miImpacto().subscribe({
      next: (data) => {
        this.impacto = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar tu impacto ambiental. Intenta de nuevo más tarde.';
        this.cargando = false;
      },
    });
  }

  get sinDatos(): boolean {
    return !!this.impacto && this.impacto.tradesCompleted === 0;
  }
}
