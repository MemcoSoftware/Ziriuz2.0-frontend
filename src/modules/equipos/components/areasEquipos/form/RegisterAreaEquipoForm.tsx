import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createAreaEquipo } from '../../../services/areasEquiposService';

const RegisterAreaEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [areaEquipoData, setAreaEquipoData] = useState({
    area: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAreaEquipoData({ ...areaEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createAreaEquipo(token, areaEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Área de equipo registrada exitosamente');
      
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el área de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Área de Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="area">Área:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={areaEquipoData.area}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Área de Equipo</button>
      </form>
    </div>
  );
};

export default RegisterAreaEquipoForm;
