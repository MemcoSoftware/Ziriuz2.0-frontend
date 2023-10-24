import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createTipoEquipo } from '../../../services/tiposEquipoService';

const RegisterTipoEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [tipoEquipoData, setTipoEquipoData] = useState({
    tipo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTipoEquipoData({ ...tipoEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createTipoEquipo(token, tipoEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Tipo de equipo registrado exitosamente');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el tipo de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Tipo de Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={tipoEquipoData.tipo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Tipo de Equipo</button>
      </form>
    </div>
  );
};

export default RegisterTipoEquipoForm;
