// HU11 - Chat interno del trueque + punto de encuentro.
// Formas que devuelve el backend (ChatResponseDTO, MessageResponseDTO, MeetingPointResponseDTO).

export interface ChatResponse {
  idChat: number;
  tradeId: number;
  userAId: number;
  userBId: number;
  createdAt: string;
}

// Subconjunto de UserResponseDTO que usamos para identificar al emisor.
export interface MessageSender {
  idUser: number;
  emailUser: string;
  usernameUser: string;
}

export interface MessageResponse {
  idMessage: number;
  content: string;
  status: string;
  sentAt: string;
  sender: MessageSender;
  chatId: number;
}

export interface MeetingPointResponse {
  idMeetingPoint: number;
  address: string;
  latitude: number;
  longitude: number;
  scheduledAt: string;
  tradeId: number;
}

export interface MeetingPointRequest {
  tradeId: number;
  address: string;
  latitude: number;
  longitude: number;
  scheduledAt: string;
}
