import { Role } from "src/common/enums/role.enums";

export interface UserPayload {
  userId: number;
  email: string;
  role: Role;
}