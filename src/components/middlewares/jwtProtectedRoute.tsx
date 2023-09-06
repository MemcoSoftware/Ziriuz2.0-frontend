import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

// Función para verificar la expiración del token
const isTokenExpired = () => {
  const token = sessionStorage.getItem('sessionJWTToken');
  if (!token) {
    return true; // No hay token, consideramos que está vencido
  }

  // Decodifica el token para obtener la fecha de expiración (si está en el token)
  try {
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken || Date.now() >= decodedToken.exp! * 1000) {
      return true; // El token ha expirado
    }
  } catch (error) {
    return true; // Error al decodificar el token, consideramos que está vencido
  }

  return false; // El token no ha expirado
};

// Componente de ruta protegida
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  if (isTokenExpired()) {
    return <Navigate to="/login" />; // Redirigir a /login si el token ha expirado
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
