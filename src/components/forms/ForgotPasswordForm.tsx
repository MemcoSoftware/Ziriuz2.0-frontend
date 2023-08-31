
import React, { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPasswordForm() {

    


    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
   
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await forgotPassword(email);
          console.log('Solicitud de recuperación de contraseña enviada');
          
          // Redirigir a la página de validación de OTP y pasar el correo electrónico como estado
          navigate('/otp-validator', { state: { email } });
        } catch (error) {
          console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
          // Puedes mostrar un mensaje de error al usuario
        }
      };
    return (
        <div>
            <h1>Recuperación de Contraseña</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Correo Electrónico:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Enviar Solicitud</button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;