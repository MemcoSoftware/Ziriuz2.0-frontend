import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createMarcaEquipo } from '../../../services/marcasEquipoService';

const RegisterMarcaEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [marcaEquipoData, setMarcaEquipoData] = useState({
    marca: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMarcaEquipoData({ ...marcaEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createMarcaEquipo(token, marcaEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Marca de equipo registrada exitosamente');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar la marca de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Marca de Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={marcaEquipoData.marca}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Marca de Equipo</button>
      </form>
    </div>
  );
};

export default RegisterMarcaEquipoForm;
