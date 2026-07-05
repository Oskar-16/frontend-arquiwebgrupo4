import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chatbotcomponent } from '../chatbotcomponent/chatbotcomponent';

/** Una categoría con su ahorro AMBIENTAL ILUSTRATIVO al intercambiar un objeto
 *  usado en lugar de comprar uno nuevo (promedios por categoría).
 *  Estos números son estimados para el demo. La integración real (Climatiq)
 *  vive en el backend; ver el plan / la guía del equipo. */
interface CategoriaImpacto {
  id: string;
  nombre: string;
  icono: string;
  co2: number; // kg de CO₂ evitados
  agua: number; // litros de agua ahorrados
  residuos: number; // kg de residuos evitados
}

interface Paso {
  icono: string;
  titulo: string;
  texto: string;
}

interface Feature {
  icono: string;
  titulo: string;
  texto: string;
}

interface Integrante {
  nombre: string;
  rol: string; // placeholder — confirmar roles reales con el equipo
  iniciales: string;
}

@Component({
  selector: 'app-landingcomponent',
  imports: [RouterLink, Chatbotcomponent],
  templateUrl: './landingcomponent.html',
  styleUrl: './landingcomponent.css',
})
export class Landingcomponent {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  // ── Contadores de impacto de la comunidad (ilustrativos) ──────────────────
  // Valores objetivo. A futuro se reemplazan por GET /environmental/community.
  private readonly metaCo2 = 12480; // kg CO₂
  private readonly metaAgua = 348000; // litros
  private readonly metaResiduos = 5260; // kg
  readonly metaIntercambios = 1240; // intercambios (público: usado en el hero)

  readonly co2 = signal(0);
  readonly agua = signal(0);
  readonly residuos = signal(0);
  readonly intercambios = signal(0);

  // ── Mini-calculadora "¿cuánto ahorrarías?" ────────────────────────────────
  readonly categorias: CategoriaImpacto[] = [
    { id: 'ropa', nombre: 'Ropa', icono: 'checkroom', co2: 7, agua: 2700, residuos: 0.8 },
    { id: 'electro', nombre: 'Electrónica', icono: 'devices', co2: 80, agua: 1200, residuos: 2.5 },
    { id: 'muebles', nombre: 'Muebles', icono: 'chair', co2: 90, agua: 500, residuos: 25 },
    { id: 'deportes', nombre: 'Deportes', icono: 'pedal_bike', co2: 14, agua: 800, residuos: 3 },
    { id: 'hogar', nombre: 'Hogar', icono: 'home', co2: 20, agua: 400, residuos: 4 },
    { id: 'libros', nombre: 'Libros', icono: 'menu_book', co2: 1.2, agua: 30, residuos: 0.7 },
  ];

  readonly categoriaSel = signal<string>(this.categorias[0].id);

  readonly impactoSel = computed<CategoriaImpacto>(
    () => this.categorias.find((c) => c.id === this.categoriaSel()) ?? this.categorias[0],
  );

  // ── Contenido estático de la landing ──────────────────────────────────────
  readonly pasos: Paso[] = [
    {
      icono: 'add_a_photo',
      titulo: 'Publica',
      texto: 'Sube fotos y describe eso que ya no usas. En minutos está listo para intercambiar.',
    },
    {
      icono: 'sync_alt',
      titulo: 'Empareja',
      texto: 'Nuestro sistema sugiere intercambios justos según el valor de cada artículo.',
    },
    {
      icono: 'place',
      titulo: 'Acuerda',
      texto: 'Coordina por chat un punto de encuentro seguro con la otra persona.',
    },
    {
      icono: 'handshake',
      titulo: 'Intercambia',
      texto: 'Hacen el trueque, se califican y suman impacto positivo al planeta.',
    },
  ];

  readonly features: Feature[] = [
    {
      icono: 'verified_user',
      titulo: 'Verificación KYC',
      texto: 'Perfiles verificados para que intercambies con confianza y sin sustos.',
    },
    {
      icono: 'balance',
      titulo: 'Emparejamiento justo',
      texto: 'Valoramos los artículos para que ambos lados ganen en el intercambio.',
    },
    {
      icono: 'star',
      titulo: 'Reputación',
      texto: 'Sistema de calificaciones y reseñas tras cada trueque completado.',
    },
    {
      icono: 'forum',
      titulo: 'Chat integrado',
      texto: 'Coordina detalles y puntos de encuentro sin salir de la plataforma.',
    },
  ];

  readonly equipo: Integrante[] = [
    { nombre: 'Christian Bernabe Chacaliaza', rol: 'QA & Testing', iniciales: 'CB' },
    { nombre: 'Oskar Guerrero Preciado', rol: 'Frontend', iniciales: 'OG' },
    { nombre: 'Carlo Francesko Montesinos', rol: 'Full-stack', iniciales: 'CM' },
    { nombre: 'Miguel Salas Guillen', rol: 'Backend', iniciales: 'MS' },
    { nombre: 'David Torres Meneses', rol: 'UX / UI', iniciales: 'DT' },
  ];

  readonly anio = 2025;

  constructor() {
    // Solo en el navegador: no se ejecuta durante el prerender/SSR, así la
    // hidratación queda limpia y la página estática muestra los valores en 0.
    afterNextRender(() => this.configurarContadores());
  }

  seleccionar(id: string): void {
    this.categoriaSel.set(id);
  }

  /** Formatea números con separador de miles (es-PE). */
  fmt(n: number): string {
    return Math.round(n).toLocaleString('es-PE');
  }

  // ── Animación de contadores al entrar en viewport ─────────────────────────
  private configurarContadores(): void {
    const seccion = this.host.nativeElement.querySelector<HTMLElement>('#impacto');
    if (!seccion) return;

    const reducido =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducido) {
      this.fijarValoresFinales();
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            this.animarContadores();
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(seccion);
  }

  private fijarValoresFinales(): void {
    this.co2.set(this.metaCo2);
    this.agua.set(this.metaAgua);
    this.residuos.set(this.metaResiduos);
    this.intercambios.set(this.metaIntercambios);
  }

  private animarContadores(): void {
    const duracion = 1800;
    const inicio = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const k = easeOut(t);
      this.co2.set(this.metaCo2 * k);
      this.agua.set(this.metaAgua * k);
      this.residuos.set(this.metaResiduos * k);
      this.intercambios.set(this.metaIntercambios * k);
      if (t < 1) requestAnimationFrame(tick);
      else this.fijarValoresFinales();
    };

    requestAnimationFrame(tick);
  }
}
