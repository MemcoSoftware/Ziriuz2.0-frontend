import React, { useState, useEffect } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

interface VisitaByIdCerradaProps {
  idVisita: string;
}

const VisitaByIdCerrada: React.FC<VisitaByIdCerradaProps> = ({ idVisita }) => {
  const [visita, setVisita] = useState<any>(null);
  const token = useSessionStorage('sessionJWTToken');

  useEffect(() => {
    if (token && idVisita) {
      getVisitaById(token, idVisita)
        .then(data => {
          setVisita(data);
        })
        .catch(error => console.error('Error al obtener la visita por ID:', error));
    }
  }, [token, idVisita]);

  return (
    <div>
      {/* Renderiza los detalles de la visita aquí */}
      {visita && (
        <div>
          {/* Ejemplo: Muestra el ID y el estado de la visita */}
          <p>ID Visita: {visita._id}</p>
          <p>Estado: {visita.id_visita_estado.estado}</p>
          {/* Añade más detalles según necesites */}
        </div>
      )}
    </div>
  );
};

export default VisitaByIdCerrada;
