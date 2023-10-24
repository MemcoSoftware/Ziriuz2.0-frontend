import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createModeloEquipo } from '../../../services/equiposModeloService';

const RegisterEquipoModeloForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [modeloEquipoData, setModeloEquipoData] = useState({
    modelo: '',
    precio: 0,
    id_marca: '',
    id_clase: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModeloEquipoData({ ...modeloEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createModeloEquipo(token, modeloEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Modelo de equipo registrado exitosamente');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el modelo de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Modelo de Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={modeloEquipoData.modelo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={modeloEquipoData.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_marca">Marca:</label>
          <input
            type="text"
            id="id_marca"
            name="id_marca"
            value={modeloEquipoData.id_marca}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_clase">Clase:</label>
          <input
            type="text"
            id="id_clase"
            name="id_clase"
            value={modeloEquipoData.id_clase}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Modelo de Equipo</button>
      </form>
    </div>
  );
};

export default RegisterEquipoModeloForm;
