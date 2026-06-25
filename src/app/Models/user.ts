import { Profile } from './profile';

// Mapea a UserResponseDTO del backend
export interface User {
  idUser: number;
  emailUser: string;
  usernameUser: string;
  is_premiumUser?: boolean;
  is_verifiedUser?: boolean;
  created_atUser?: string;
  updated_atUser?: string;
  is_enabledUser?: boolean;
  veteran?: boolean;
  role?: { idRole?: number; nameRole?: string };
  profile?: Profile;
}
