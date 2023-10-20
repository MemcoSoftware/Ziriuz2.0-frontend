import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createEquipo } from '../../../services/equiposService';

const RegisterEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [equipoData, setEquipoData] = useState({
    id_sede: '',
    modelo_equipos: '',
    id_area: '',
    id_tipo: '',
    serie: '',
    ubicacion: '',
    frecuencia: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEquipoData({ ...equipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = loggedIn;
      await createEquipo(token, equipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Equipo registrado exitosamente');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el equipo:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id_sede">Sede:</label>
          <input
            type="text"
            id="id_sede"
            name="id_sede"
            value={equipoData.id_sede}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="modelo_equipos">Modelo de Equipos:</label>
          <input
            type="text"
            id="modelo_equipos"
            name="modelo_equipos"
            value={equipoData.modelo_equipos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_area">Área:</label>
          <input
            type="text"
            id="id_area"
            name="id_area"
            value={equipoData.id_area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_tipo">Tipo de Equipo:</label>
          <input
            type="text"
            id="id_tipo"
            name="id_tipo"
            value={equipoData.id_tipo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="serie">Serie:</label>
          <input
            type="text"
            id="serie"
            name="serie"
            value={equipoData.serie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación:</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={equipoData.ubicacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="frecuencia">Frecuencia:</label>
          <input
            type="number"
            id="frecuencia"
            name="frecuencia"
            value={equipoData.frecuencia}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar Equipo</button>
      </form>
    </div>
  );
};

export default RegisterEquipoForm;
