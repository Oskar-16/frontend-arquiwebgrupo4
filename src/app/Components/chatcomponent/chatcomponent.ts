import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Chatservice } from '../../Services/chatservice';
import { AuthService } from '../../Services/auth.service';
import { Ratingservice } from '../../Services/ratingservice';
import { ChatResponse, MessageResponse, MeetingPointResponse } from '../../Models/chat';
import { enviroment } from '../../../Enviroments/enviroments.developments';

// HU11 - Chat interno del trueque (mensajes + punto de encuentro)
@Component({
  selector: 'app-chatcomponent',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterLink],
  templateUrl: './chatcomponent.html',
  styleUrl: './chatcomponent.css',
})
export class Chatcomponent implements OnInit {
  @ViewChild('hilo') hilo?: ElementRef<HTMLDivElement>;

  tradeId = 0;
  chat?: ChatResponse;
  mensajes: MessageResponse[] = [];
  punto?: MeetingPointResponse;
  // mapa embebido del punto de encuentro
  mapaUrl?: SafeResourceUrl;

  otroUsuario = 'Chat del trueque';
  otroId = 0;
  nuevoMensaje = '';
  cargando = true;
  error = '';

  // edición del punto de encuentro
  editandoPunto = false;
  formPunto = { address: '', scheduledAt: '' };
  errorPunto = '';
  guardandoPunto = false;

  // calificación al otro usuario
  puntaje = 0;
  comentario = '';
  calificado = false;
  errorCalificacion = '';

  private miEmail = '';
  private esNavegador: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatS: Chatservice,
    private auth: AuthService,
    private ratingS: Ratingservice,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.esNavegador = isPlatformBrowser(platformId);
    // datos del otro usuario pasados por router state desde "Mis trueques"
    if (this.esNavegador) {
      const st = history.state as { otro?: string; otroId?: number } | undefined;
      if (st?.otro) this.otroUsuario = st.otro;
      if (st?.otroId) this.otroId = st.otroId;
    }
  }

  ngOnInit(): void {
    this.miEmail = this.auth.obtenerEmail() ?? '';
    this.tradeId = Number(this.route.snapshot.paramMap.get('tradeId'));
    this.cargarChat();
    this.cargarPunto();
  }

  private cargarChat(): void {
    this.chatS.chatDeTrade(this.tradeId).subscribe({
      next: (c) => {
        this.chat = c;
        this.cargarMensajes();
      },
      error: () => {
        this.error = 'No se pudo abrir el chat de este trueque.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  private cargarMensajes(): void {
    if (!this.chat) return;
    this.chatS.mensajes(this.chat.idChat).subscribe({
      next: (m) => {
        this.mensajes = m ?? [];
        this.cargando = false;
        this.derivarNombreOtro();
        this.irAlFinal();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  private cargarPunto(): void {
    this.chatS.puntoDeTrade(this.tradeId).subscribe({
      next: (p) => {
        this.punto = p ?? undefined;
        this.actualizarMapa();
        this.sincronizarForm();
        this.cdr.detectChanges();
      },
      // que aún no exista punto de encuentro es un caso normal, no un error visible
      error: () => {
        this.punto = undefined;
        this.cdr.detectChanges();
      },
    });
  }

  // Si no vinieron por state (refresh, link directo, volver desde el historial),
  // deducimos nombre e id del otro participante del primer mensaje que no es mío.
  private derivarNombreOtro(): void {
    const otro = this.mensajes.find((m) => !this.esMio(m));
    if (!otro?.sender) return;
    if (this.otroUsuario === 'Chat del trueque') this.otroUsuario = otro.sender.usernameUser;
    if (!this.otroId) this.otroId = otro.sender.idUser;
  }

  esMio(m: MessageResponse): boolean {
    return !!this.miEmail && m.sender?.emailUser === this.miEmail;
  }

  iniciales(nombre: string): string {
    return (nombre || '?').slice(0, 2).toUpperCase();
  }

  enviar(): void {
    const texto = this.nuevoMensaje.trim();
    if (!texto || !this.chat) return;
    this.chatS.enviar(this.chat.idChat, texto).subscribe({
      next: (m) => {
        this.mensajes = [...this.mensajes, m];
        this.nuevoMensaje = '';
        this.irAlFinal();
        this.cdr.detectChanges();
      },
      // si falla el envío avisamos y conservamos el texto escrito
      error: () => {
        alert('No se pudo enviar el mensaje. Inténtalo de nuevo.');
      },
    });
  }

  // ---- punto de encuentro ----
  // arma la url del mapa embebido con la direccion del punto
  private actualizarMapa(): void {
    if (!this.punto?.address) {
      this.mapaUrl = undefined;
      return;
    }
    const q = encodeURIComponent(this.punto.address);
    const url = `https://www.google.com/maps/embed/v1/place?key=${enviroment.googleMapsApiKey}&q=${q}&zoom=16`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private sincronizarForm(): void {
    this.formPunto = {
      address: this.punto?.address ?? '',
      // datetime-local usa 'YYYY-MM-DDTHH:mm'
      scheduledAt: this.punto ? this.punto.scheduledAt.slice(0, 16) : '',
    };
  }

  editarPunto(): void {
    this.editandoPunto = true;
    this.errorPunto = '';
    this.sincronizarForm();
  }

  cancelarEdicion(): void {
    this.editandoPunto = false;
    this.errorPunto = '';
  }

  guardarPunto(): void {
    if (!this.formPunto.address.trim()) {
      this.errorPunto = 'Ingresa la dirección del punto de encuentro.';
      return;
    }
    if (!this.formPunto.scheduledAt) {
      this.errorPunto = 'Elige la fecha y hora del encuentro.';
      return;
    }
    const fechaElegida = new Date(this.formPunto.scheduledAt);
    if (fechaElegida < new Date()) {
      this.errorPunto = 'La fecha del encuentro no puede ser en el pasado.';
      return;
    }

    this.errorPunto = '';
    this.guardandoPunto = true;
    const scheduledAt =
      this.formPunto.scheduledAt.length === 16
        ? `${this.formPunto.scheduledAt}:00`
        : this.formPunto.scheduledAt;
    const dto = {
      tradeId: this.tradeId,
      address: this.formPunto.address.trim(),
      latitude: this.punto?.latitude ?? 0,
      longitude: this.punto?.longitude ?? 0,
      scheduledAt,
    };
    const peticion = this.punto
      ? this.chatS.actualizarPunto(this.punto.idMeetingPoint, dto)
      : this.chatS.crearPunto(dto);
    peticion.subscribe({
      next: (p) => {
        this.punto = p;
        this.actualizarMapa();
        this.editandoPunto = false;
        this.guardandoPunto = false;
        this.sincronizarForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardandoPunto = false;
        this.errorPunto = typeof err?.error === 'string' ? err.error : 'No se pudo guardar el punto de encuentro.';
        this.cdr.detectChanges();
      },
    });
  }

  // ---- calificación (HU09 desde el chat) ----
  estrella(n: number): void {
    this.puntaje = n;
  }

  calificar(): void {
    if (!this.otroId || this.puntaje === 0) return;
    this.errorCalificacion = '';
    this.ratingS
      .crear({
        tradeId: this.tradeId,
        ratedUserId: this.otroId,
        score: this.puntaje,
        comment: this.comentario.trim(),
      })
      .subscribe({
        next: () => {
          this.calificado = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorCalificacion = typeof err?.error === 'string' ? err.error : 'No se pudo enviar la calificación.';
          this.cdr.detectChanges();
        },
      });
  }

  volver(): void {
    this.router.navigate(['/trueques']);
  }

  private irAlFinal(): void {
    if (!this.esNavegador) return;
    setTimeout(() => {
      const el = this.hilo?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
