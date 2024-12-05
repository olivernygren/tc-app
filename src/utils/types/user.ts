export interface User {
  documentId: string;
  email: string;
  name: string;
  username?: string;
  role: UserRolesEnum;
  createdAt: Date;
  coachId?: string;
}

export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
