import { User, UserRolesEnum } from '../types/user';

class UserUtils {
  static isAdminUser(user: User): boolean {
    return user.role === UserRolesEnum.ADMIN;
  }
}

export default UserUtils;
