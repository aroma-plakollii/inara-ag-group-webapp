import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {Auth} from "../types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: any[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
  // const { isAuthenticated } = useAuth();
  // const user = useSelector((state: RootState) => state.auth.user );
  const storedData = sessionStorage.getItem('auth');
  const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
  const isAuthenticated = sessionAuthData ? sessionAuthData.isAuthenticated : false;
  const user = sessionAuthData ? sessionAuthData.user : null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
