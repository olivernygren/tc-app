import { LocaleEnum } from '../enums/enums';
import { ExerciseLoadUnitEnum } from './exercise';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: UserRolesEnum;
  createdAt: Date;
  coachId?: string;
  preferences: UserPreferences;
  gender?: GenderEnum;
  provider: AuthProviderEnum;
}

export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum AuthProviderEnum {
  GOOGLE = 'google',
  EMAIL = 'email',
}

export interface UserPreferences {
  language: LocaleEnum;
  weightUnit: ExerciseLoadUnitEnum;
}

export interface UpdateUserPreferencesInput {
  language?: LocaleEnum;
  weightUnit?: ExerciseLoadUnitEnum;
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
