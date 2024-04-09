import { UserRole } from '@/utils/constants';

export default function access(initialState: { currentUser?: User.UserInfo } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser:
      currentUser &&
      (currentUser.userRole === UserRole.USER || currentUser.userRole === UserRole.ADMIN),
    canAdmin: currentUser && currentUser.userRole === UserRole.ADMIN,
  };
}
