// Chatbot de la landing page (proxy backend -> Groq). No confundir con Models/chat.ts
// (ese es el chat interno de un trueque).

export interface ChatbotRequest {
  message: string;
}

export interface ChatbotResponse {
  reply: string;
}
