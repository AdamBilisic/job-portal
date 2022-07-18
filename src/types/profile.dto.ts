import { ProfileType } from "../types/profile.enum";

export interface ProfileDto {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: ProfileType;
}
