import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useUserRole = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const isUserSuperAdmin = user?.userRole === 'SUPERADMIN';
    const isUserAdmin = user?.userRole === 'ADMIN';
    const isUserAgent = user?.userRole === 'AGENT';
  
    return { isUserSuperAdmin, isUserAdmin, isUserAgent };
};
  