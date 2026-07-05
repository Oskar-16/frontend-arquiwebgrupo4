export interface RatingUser {
  idUser: number;
  usernameUser: string;
  emailUser: string;
}

export interface Rating {
  idRating: number;
  score: number;
  comment: string;
  createdAt: string;
  rater?: RatingUser;
  ratedUserId: number;
  tradeId: number;
}

export interface RatingRequest {
  tradeId: number;
  ratedUserId: number;
  score: number;
  comment: string;
}
