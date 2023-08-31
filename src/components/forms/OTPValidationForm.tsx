import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateOTP } from '../../services/authService';

interface OTPValidationFormProps {
  email: string; // Prop para recibir el correo electrónico
}

const OTPValidationForm: React.FC<OTPValidationFormProps> = ({ email }) => {
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (values: { otp: string }) => {
    try {
      const response = await validateOTP(email, values.otp);
      // console.log('Response from backend:', response);
  
      if (response.status === 200) {
        console.log('OTP is valid, redirecting to update-password');
        // OTP válido, redirigir a la página de cambio de contraseña (/update-password)
        navigate('/update-password');
      } else {
        // console.log('OTP is not valid, setting validation message');
        // OTP no válido, muestra un mensaje al usuario
        setValidationMessage('El código OTP no es válido o está expirado. Inténtalo nuevamente.');
      }
    } catch (error) {
      // console.error('Error while validating OTP:', error);
      // Manejar el error de manera adecuada aquí, si es necesario
      setValidationMessage('Error al validar el código OTP. Inténtalo nuevamente.');
    }
  };
  

  return (
    <div>
      <h1>Validation Form</h1>
      <Formik initialValues={{ otp: '' }} onSubmit={handleSubmit}>
        <Form>
          <div>
            <p>Correo Electrónico: {email}</p> {/* Mostrar el correo electrónico */}
            <label htmlFor="otp">Ingrese el código OTP:</label>
            <Field type="text" id="otp" name="otp" />
          </div>
          <div>
            <button type="submit">Validar OTP</button>
          </div>
        </Form>
      </Formik>
      {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
    </div>
  );
};

export default OTPValidationForm;
