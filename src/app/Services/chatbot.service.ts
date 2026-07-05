import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatbotRequest, ChatbotResponse } from '../Models/chatbot';
import { enviroment } from '../../Enviroments/enviroments.developments';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private url = `${enviroment.base}/chatbot`;

  constructor(private http: HttpClient) {}

  enviarMensaje(message: string): Observable<ChatbotResponse> {
    const body: ChatbotRequest = { message };
    return this.http.post<ChatbotResponse>(this.url, body);
  }
}
