// SolicitudServicioCard.tsx
import React from 'react';
import { SolicitudServicio } from '../../utils/types/SolicitudServicio.type'; // Asegúrate de importar el tipo correctamente

interface SolicitudServicioCardProps {
  solicitud: SolicitudServicio;
  onClick: () => void;
}

const SolicitudServicioCard: React.FC<SolicitudServicioCardProps> = ({ solicitud, onClick }) => {
  return (
    <div key={solicitud._id} className='SolicitudServicioPages-container-card'>
      <div className='SolicitudServicioPages-card-section'>
        <ul className='SolicitudServicioPages-cards-list'>
          <li>
              <div className='SolicitudServicioPages-card-overlay' onClick={onClick}>
                {/* Aquí puedes adaptar y expandir la información que deseas mostrar de cada solicitud */}
                <p className='SolicitudServicioPages-card-description'>Creador: {solicitud.id_creador.name}</p>
                <p className='SolicitudServicioPages-card-description'>Servicio: {solicitud.id_servicio.servicio}</p>
                <p className='SolicitudServicioPages-card-description'>Estado: {solicitud.id_solicitud_estado.estado}</p>
                <p className='SolicitudServicioPages-card-description'>Equipo: {solicitud.id_equipo.serie}</p>
                <p className='SolicitudServicioPages-card-description'>Creado en: {solicitud.creacion}</p>
                <p className='SolicitudServicioPages-card-description'>Aviso: {solicitud.aviso}</p>
                {/* Continúa agregando los campos que consideres necesarios */}
              </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SolicitudServicioCard;
