import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface PasoGuia {
  icono: string;
  titulo: string;
  texto: string;
  enlace: string;
  cta: string;
}

@Component({
  selector: 'app-guiacomponent',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './guiacomponent.html',
  styleUrl: './guiacomponent.css',
})
export class Guiacomponent {
  readonly pasos: PasoGuia[] = [
    {
      icono: 'add_box',
      titulo: '1. Publica un artículo',
      texto: 'Registra lo que ya no usas: dale un título, una descripción, su estado y una categoría.',
      enlace: '/items/insertaritem',
      cta: 'Registrar item',
    },
    {
      icono: 'search',
      titulo: '2. Explora y encuentra',
      texto: 'Busca por nombre o filtra por categoría para descubrir artículos que te interesen.',
      enlace: '/explorar',
      cta: 'Explorar',
    },
    {
      icono: 'swap_horiz',
      titulo: '3. Propón un trueque',
      texto: 'Entra al detalle de un artículo y ofrece uno o varios de los tuyos a cambio.',
      enlace: '/explorar',
      cta: 'Ver artículos',
    },
    {
      icono: 'handshake',
      titulo: '4. Acepta y coordina',
      texto: 'Revisa las propuestas recibidas, acéptalas o recházalas y coordina el intercambio.',
      enlace: '/trueques',
      cta: 'Mis trueques',
    },
    {
      icono: 'eco',
      titulo: '5. Suma impacto',
      texto: 'Con cada trueque completado ahorras CO₂, agua y residuos. ¡Mira tu contribución!',
      enlace: '/impacto',
      cta: 'Ver mi impacto',
    },
  ];
}
