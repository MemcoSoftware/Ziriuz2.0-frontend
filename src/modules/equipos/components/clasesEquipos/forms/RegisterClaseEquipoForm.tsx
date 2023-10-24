import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createClaseEquipo } from '../../../services/clasesEquipoService';

const RegisterClaseEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [claseEquipoData, setClaseEquipoData] = useState({
    clase: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClaseEquipoData({ ...claseEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createClaseEquipo(token, claseEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Clase de equipo registrada exitosamente');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar la clase de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Clase de Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clase">Clase:</label>
          <input
            type="text"
            id="clase"
            name="clase"
            value={claseEquipoData.clase}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Clase de Equipo</button>
      </form>
    </div>
  );
};

export default RegisterClaseEquipoForm;
