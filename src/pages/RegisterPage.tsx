import React, { useEffect } from 'react';
import RegisterUserForm from '../components/forms/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';



export const RegisterPage = () =>{
    const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();
    useEffect(() => {
        if (!loggedIn) {
        navigate('/login');
        }
    }, [loggedIn, navigate]);

    return (
        <div>
            
            <RegisterUserForm></RegisterUserForm>
        </div>    )
}