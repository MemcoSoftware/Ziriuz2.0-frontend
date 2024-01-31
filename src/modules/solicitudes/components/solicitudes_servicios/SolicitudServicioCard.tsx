// SolicitudServicioCard.tsx
import React from 'react';
import { SolicitudServicio } from '../../utils/types/SolicitudServicio.type'; // Asegúrate de importar el tipo correctamente
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
interface SolicitudServicioCardProps {
  solicitud: SolicitudServicio;
  onClick: () => void;
}

const SolicitudServicioCard: React.FC<SolicitudServicioCardProps> = ({ solicitud, onClick }) => {
  return (
    <div key={solicitud._id} className='SolicitudServicioPages-container-card'>
      <div className='SolicitudServicioPages-card-section'>
        <ul className='SolicitudServicioPages-cards-list'>
          <li className='SolicitudServicioPages-cards-list'>
              <div className='SolicitudServicioPages-card-overlay' onClick={onClick}>
                  <div className="container">
                    <div className="div">
                      <div className="overlap-group">
                        <header className="header">
                          <div className="rectangle" />
                        </header>
                        <div className="header-info">
                          <div className="servicio-title">{solicitud.id_servicio.servicio}</div>
                          <div className="creation-date">{solicitud.creacion}</div>
                          <div className="oid-solicitud">{solicitud._id}</div>
                          <HelpOutlinedIcon className="estado"  />
                          <div className="username">{solicitud.id_cambiador.name}</div>
                          <PublishedWithChangesOutlinedIcon className="update-icon"/>
                        </div>
                      </div>
                      <div className="overlap">
                        <div className="separator" />
                        <div className="equipo-info">
                          <div className="info-title">EQUIPO INFO</div>
                          <div className="equipo-class">{solicitud.id_equipo.modelo_equipos.id_clase.clase}</div>
                          <div className="oid-equipo">SERIE</div>
                          <div className="text-wrapper">{solicitud.id_equipo.serie}</div>
                        </div>
                        <div className="sede-info">
                          <div className="info-sede-title">SEDE</div>
                          <div className="sede-name">{solicitud.id_equipo.id_sede.sede_nombre}</div>
                          <div className="oid-sede">CLIENTE</div>
                          <p className="text-wrapper">{solicitud.id_equipo.id_sede.id_client.client_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </li>


        </ul>
      </div>
    </div>
  );
};

export default SolicitudServicioCard;
