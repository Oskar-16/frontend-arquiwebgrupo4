import { Category } from './category';
import { User } from './user';

// Mapea a ItemResponseDTO del backend (GET /items, GET /items/{id})
// statusItem: 1 = Disponible, 2 = Pausado, 3 = Intercambiado
export interface ItemResponse {
  idItem: number;
  titleItem: string;
  descriptionItem: string;
  conditionItem: number;
  statusItem: number;
  user?: User;
  category?: Category;
}
