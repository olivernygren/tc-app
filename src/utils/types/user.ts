import { LocaleEnum } from '../enums/enums';
import { ExerciseLoadUnitEnum } from './exercise';

export interface User {
  documentId: string;
  email: string;
  name: string;
  username?: string;
  role: UserRolesEnum;
  createdAt: Date;
  coachId?: string;
  preferences: UserPreferences;
}

export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserPreferences {
  language: LocaleEnum;
  weightUnit: ExerciseLoadUnitEnum;
}

export interface UpdateUserPreferencesInput {
  language?: LocaleEnum;
  weightUnit?: ExerciseLoadUnitEnum;
}
