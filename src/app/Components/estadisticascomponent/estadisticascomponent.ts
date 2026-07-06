import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Estadisticaservice } from '../../Services/estadisticaservice';

// HU - panel de estadisticas para el admin (tres graficos)
@Component({
  selector: 'app-estadisticascomponent',
  imports: [BaseChartDirective, MatIconModule, MatCardModule],
  templateUrl: './estadisticascomponent.html',
  styleUrl: './estadisticascomponent.css',
})
export class Estadisticascomponent implements OnInit {
  isBrowser: boolean;

  // items por categoria (barra)
  itemsHasData = false;
  itemsOptions: ChartOptions = { responsive: true };
  itemsLabels: string[] = [];
  itemsData: ChartDataset[] = [];
  itemsType: ChartType = 'bar';

  // trueques por estado (dona)
  truequesHasData = false;
  truequesOptions: ChartOptions = { responsive: true };
  truequesLabels: string[] = [];
  truequesData: ChartDataset[] = [];
  truequesType: ChartType = 'doughnut';

  // ranking de usuarios (barra horizontal)
  rankingHasData = false;
  rankingOptions: ChartOptions = { responsive: true, indexAxis: 'y' };
  rankingLabels: string[] = [];
  rankingData: ChartDataset[] = [];
  rankingType: ChartType = 'bar';

  // verdes de la app
  verdes = ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#1b5e20'];

  constructor(
    private eS: Estadisticaservice,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.eS.itemsPorCategoria().subscribe({
      next: data => {
        if (data.length > 0) {
          this.itemsHasData = true;
          this.itemsLabels = data.map(x => x.etiqueta);
          this.itemsData = [{ data: data.map(x => x.cantidad), label: 'Items', backgroundColor: this.verdes }];
        } else this.itemsHasData = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.itemsHasData = false;
        this.cdr.detectChanges();
      },
    });

    this.eS.truequesPorEstado().subscribe({
      next: data => {
        if (data.length > 0) {
          this.truequesHasData = true;
          this.truequesLabels = data.map(x => x.etiqueta);
          this.truequesData = [{ data: data.map(x => x.cantidad), label: 'Trueques', backgroundColor: this.verdes }];
        } else this.truequesHasData = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.truequesHasData = false;
        this.cdr.detectChanges();
      },
    });

    this.eS.rankingUsuarios().subscribe({
      next: data => {
        if (data.length > 0) {
          this.rankingHasData = true;
          this.rankingLabels = data.map(x => x.etiqueta);
          this.rankingData = [{ data: data.map(x => x.cantidad), label: 'Trueques', backgroundColor: this.verdes }];
        } else this.rankingHasData = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.rankingHasData = false;
        this.cdr.detectChanges();
      },
    });
  }
}
