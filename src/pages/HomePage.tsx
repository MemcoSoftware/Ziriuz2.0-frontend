import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { Dashboard } from '../components/dashboard/Dashboard';

export const HomePage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const userRoles = useSessionStorage('userRoles');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !userRoles) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
     
      <Dashboard />
      
      {/* Resto del contenido del HomePage */}
    </div>
  );
};