import React, { useEffect } from 'react';
import RegisterUserForm from '../components/forms/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';
import './styles/RegisterPage.css';
import useUserRoleVerifier from '../hooks/useUserRoleVerifier';

export const RegisterPage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const isAdmin = useUserRoleVerifier(['administrador']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !isAdmin) {
        
      // Si no está loggedIn o no es admin, muestra el mensaje y redirige
      window.alert('No puedes hacer esto');
      navigate('/login');
    }
  }, [loggedIn, isAdmin, navigate]);

  return (
    <div>
      <div className='RegisterPage-DashboardMenuLateral'>
        <DashboardMenuLateral />
      </div>
      <div className='RegisterPage-container'>
        <RegisterUserForm />
      </div>
    </div>
  );
};
