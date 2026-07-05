import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatbotService } from '../../Services/chatbot.service';

interface ChatBubble {
  autor: 'user' | 'bot';
  texto: string;
}

@Component({
  selector: 'app-chatbotcomponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbotcomponent.html',
  styleUrl: './chatbotcomponent.css',
})
export class Chatbotcomponent {
  @ViewChild('scrollAnchor') private scrollAnchor?: ElementRef<HTMLElement>;

  readonly abierto = signal(false);
  readonly cargando = signal(false);
  readonly mensajes = signal<ChatBubble[]>([
    { autor: 'bot', texto: '¡Hola! Soy el asistente de Tu Trade. ¿En qué te ayudo?' },
  ]);
  texto = '';

  constructor(private chatbotService: ChatbotService) {}

  alternar(): void {
    this.abierto.update((v) => !v);
  }

  enviar(): void {
    const mensaje = this.texto.trim();
    if (!mensaje || this.cargando()) return;

    this.mensajes.update((m) => [...m, { autor: 'user', texto: mensaje }]);
    this.texto = '';
    this.cargando.set(true);

    this.chatbotService.enviarMensaje(mensaje).subscribe({
      next: (res) => {
        this.mensajes.update((m) => [...m, { autor: 'bot', texto: res.reply }]);
        this.cargando.set(false);
        this.desplazar();
      },
      error: () => {
        this.mensajes.update((m) => [
          ...m,
          { autor: 'bot', texto: 'No pude responder ahora mismo. Intenta de nuevo en un momento.' },
        ]);
        this.cargando.set(false);
        this.desplazar();
      },
    });

    this.desplazar();
  }

  private desplazar(): void {
    queueMicrotask(() =>
      this.scrollAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' }),
    );
  }
}
