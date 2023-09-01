import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { Dashboard } from '../components/dashboard/Dashboard';

export const HomePage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Dashboard />
      
      {/* Resto del contenido del HomePage */}
    </div>
  );
};