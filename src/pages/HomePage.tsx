import React, { useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { Dashboard } from '../components/dashboard/Dashboard';
import { logoutService } from '../services/authService';

export const HomePage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  

  useEffect(() => {
    if (!loggedIn) {
      logoutService(); // Utiliza la función de logoutService para manejar el cierre de sesión
    }
  }, [loggedIn]);

  return (
    <div>
      <Dashboard />
      {/* Resto del contenido del HomePage */}
    </div>
  );
};
