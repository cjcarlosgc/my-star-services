import { Role } from "../enums/role";

export interface TokenContent {
    userId: string;
    role: Role;
}
