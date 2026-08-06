import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false, requireSeller = false }) {
  const { isAuthenticated, isAdmin, isSeller } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/account" replace />;
  }

  if (requireSeller && !isSeller) {
    return <Navigate to="/account" replace />;
  }

  return children;
}
