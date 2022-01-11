import { UserRoles } from "../constants/userRoles";

export class PublicUser {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  cityId: string;
  email: string;
  phone: string;
  role: UserRoles;
}