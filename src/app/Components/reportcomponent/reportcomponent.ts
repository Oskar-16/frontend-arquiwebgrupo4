import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class Reportcomponent implements OnInit {
  razones = RAZONES;
  enviando = signal(false);
  exito = signal('');
  error = signal('');
  prellenado = false;

  form: ReportRequest = {
    reportedUserId: 0,
    reason: '',
    description: '',
  };

  constructor(private reportSrv: Reportservice, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Si venimos desde el chat de un trueque, ya sabemos a quién se reporta —
    // sin esto, el usuario tendría que adivinar el ID numérico de la otra persona.
    const userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    if (userId > 0) {
      this.form.reportedUserId = userId;
      this.prellenado = true;
    }
  }

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
      error: (err) => {
        this.error.set(typeof err?.error === 'string' ? err.error : 'Error al enviar el reporte.');
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
