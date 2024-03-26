import React, { useState } from 'react';
import { updateVisita } from '../../services/visitasService'; // Asegúrate de que la ruta sea correcta
import { CircularProgress } from '@mui/material';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/EquipoDisponibilidadRegistrar.css'
interface EquipoDisponibleRegistrarProps {
  idVisita: string;
}

const EquipoDisponibleRegistrar: React.FC<EquipoDisponibleRegistrarProps> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [observacion, setObservacion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!observacion) {
      alert('Por favor, complete el campo de observación.');
      return;
    }

    const formattedDateCreated = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const nuevaActividad = {
      actividades: [{
        id_protocolo: '65a93df489a02ef211e75ed3', // ID fijo para "Equipo Disponible"
        observacion: observacion,
        date_created: formattedDateCreated,
      }]
    };

    try {
      if (token && idVisita) {
        await updateVisita(token, idVisita, nuevaActividad);
        alert('Actividad "Equipo Disponible" agregada a la visita con éxito.');
      } else {
        alert('No se encontró token de sesión.');
      }
    } catch (error) {
      console.error('Error al actualizar la visita:', error);
      alert('Error al actualizar la visita.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="EquipoDisponibleRegistrar-actividad">
      <form onSubmit={handleSubmit}>
              <div className="EquipoDisponibleRegistrar-div">
                <div className="EquipoDisponibleRegistrar-overlap-group">
                  <div className="EquipoDisponibleRegistrar-disponible-t">Equipo Disponible</div>
                </div>
                <label className="EquipoDisponibleRegistrar-disponible" htmlFor="observacion">Observación: *</label>
                <textarea 
                className="EquipoDisponibleRegistrar-disponible-2"
                id="observacion"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Escribe tu observación aquí..."
                />
                <button type='submit' className="EquipoDisponibleRegistrar-overlap">
                  CREAR ACTIVIDAD
                </button>
              </div>
      </form>
    </div>
  );
}

export default EquipoDisponibleRegistrar;
