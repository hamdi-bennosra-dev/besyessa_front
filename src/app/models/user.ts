import { Active } from "../Enum/active";
import { Role } from "../Enum/role";
import { UserDetails } from "./userdetails";

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role; // ou Enum selon comment vous gérez les enums côté client
  active: Active; // ou Enum
  userDetails: UserDetails;
  creationTimestamp: string; // Ajoutez ces champs de date
  updateTimestamp: string;
}