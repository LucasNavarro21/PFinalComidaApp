import { UserRole } from "../entities/User.js";

export class AccessProtectedFeature {
  static async execute(userRole: UserRole, requiredRole: UserRole): Promise<boolean> {
    const rolesHierarchy = [
      UserRole.CUSTOMER,
      UserRole.RESTAURANT_OWNER,
      UserRole.ADMIN,
      UserRole.DELIVERY_PERSON
    ];

    const userIndex = rolesHierarchy.indexOf(userRole);
    const requiredIndex = rolesHierarchy.indexOf(requiredRole);

    if (userIndex === -1 || requiredIndex === -1) return false;

    return userIndex >= requiredIndex;
  }
}
