import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReportRequest } from '../../Models/report';
import { Reportservice } from '../../Services/reportservice';

const RAZONES = [
  'Comportamiento abusivo',
  'Fraude o estafa',
  'Contenido inapropiado',
  'Spam',
  'Otro',
];

@Component({
  selector: 'app-reportcomponent',
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './reportcomponent.html',
  styleUrl: './reportcomponent.css',
})
export class Reportcomponent {
  razones = RAZONES;
  enviando = signal(false);
  exito = signal('');
  error = signal('');

  form: ReportRequest = {
    reportedUserId: 0,
    reason: '',
    description: '',
  };

  constructor(private reportSrv: Reportservice) {}

  enviar(): void {
    if (!this.form.reportedUserId || !this.form.reason || !this.form.description.trim()) {
      this.error.set('Completa todos los campos.');
      return;
    }
    this.enviando.set(true);
    this.error.set('');
    this.reportSrv.crear(this.form).subscribe({
      next: () => {
        this.exito.set('Reporte enviado. Lo revisaremos pronto.');
        this.enviando.set(false);
        this.form = { reportedUserId: 0, reason: '', description: '' };
      },
      error: () => {
        this.error.set('Error al enviar el reporte.');
        this.enviando.set(false);
      }
    });
  }

  limpiar(): void {
    this.form = { reportedUserId: 0, reason: '', description: '' };
    this.exito.set('');
    this.error.set('');
  }
}
