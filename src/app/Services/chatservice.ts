import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../Enviroments/enviroments.developments';
import {
  ChatResponse,
  MessageResponse,
  MeetingPointResponse,
  MeetingPointRequest,
} from '../Models/chat';

@Injectable({ providedIn: 'root' })
export class Chatservice {
  private base = enviroment.base;

  constructor(private http: HttpClient) {}

  // ---- Chat + mensajes (HU11) ----
  chatDeTrade(tradeId: number) {
    return this.http.get<ChatResponse>(`${this.base}/chats/trade/${tradeId}`);
  }

  mensajes(chatId: number) {
    return this.http.get<MessageResponse[]>(`${this.base}/messages/chat/${chatId}`);
  }

  enviar(chatId: number, content: string) {
    return this.http.post<MessageResponse>(`${this.base}/messages`, { chatId, content });
  }

  marcarLeido(idMessage: number) {
    return this.http.put(`${this.base}/messages/${idMessage}/read`, {});
  }

  // ---- Punto de encuentro (MeetingPoint) ----
  puntoDeTrade(tradeId: number) {
    return this.http.get<MeetingPointResponse>(`${this.base}/meeting-points/trade/${tradeId}`);
  }

  crearPunto(dto: MeetingPointRequest) {
    return this.http.post<MeetingPointResponse>(`${this.base}/meeting-points`, dto);
  }

  actualizarPunto(id: number, dto: MeetingPointRequest) {
    return this.http.put<MeetingPointResponse>(`${this.base}/meeting-points/${id}`, dto);
  }
}
