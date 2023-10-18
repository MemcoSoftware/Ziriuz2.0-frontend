import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getEquipoById } from '../services/equiposService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useParams } from 'react-router-dom';

const EquipoDetailPage: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams(); // Obtiene el ID del equipo de los parámetros de la URL
  const [equipo, setEquipo] = useState<any>(null); // Debes ajustar el tipo de acuerdo a la estructura de datos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      // Aquí debes manejar la redirección si el usuario no está autenticado
      return;
    }

    if (!id) {
      // Maneja el caso en el que id es undefined (parámetro no encontrado en la URL)
      console.error('ID del equipo no encontrado en la URL');
      return;
    }

    const fetchEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getEquipoById(token, id);

        setEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del equipo:', error);
      }
    };

    fetchEquipo();
  }, [loggedIn, id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!equipo) {
    return <div>No se encontró información del equipo.</div>;
  }

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles del Equipo</h1>
      <div>
        <h3>Serie: {equipo.serie}</h3>
        <p>Modelo: {equipo.modelo_equipos.modelo}</p>
        <p>Sede: {equipo.id_sede.sede_nombre}</p>
        <p>Ubicacion en sede: {equipo.ubicacion}</p>
        <p>Área: {equipo.id_area.area}</p>
        <p>Tipo: {equipo.id_tipo.tipo}</p>
        <p>Frecuencia Mantenimiento en meses: {equipo.frecuencia}</p>

      </div>
    </div>
  );
};

export default EquipoDetailPage;
