import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createPreventivo } from '../../../services/preventivosService'; // Ajusta la importación según la ubicación correcta
import './styles/RegisterPreventivoForm.css'; // Asegúrate de importar el archivo CSS correcto
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';

const RegisterPreventivoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [preventivoData, setPreventivoData] = useState({
    title: '',
    codigo: '',
    version: 0,
    fecha: '',
    cualitativo: [],
    mantenimiento: [],
    cuantitativo: [],
    otros: [],
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreventivoData({ ...preventivoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createPreventivo(token, preventivoData);
      console.log('Preventivo registrado exitosamente');
      window.alert('Preventivo registrado exitosamente');
      navigate('/preventivos');
    } catch (error) {
      console.error('Error al registrar el preventivo:', error);
    }
  };

  return (
    <div>
      <div className="RegisterPreventivoForm-box">
        <form onSubmit={handleSubmit} className="REGISTER-PREVENTIVO-FORM">
          {/* Resto del formulario según tus requerimientos */}
          {/* Recuerda utilizar etiquetas <p> para los campos del preventivo */}
        </form>
      </div>
    </div>
  );
};

export default RegisterPreventivoForm;
