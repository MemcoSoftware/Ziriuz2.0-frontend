import React from 'react';
import { Orden } from '../../utils/types/Orden.type'; // Asegúrate de ajustar la ruta correcta

interface OrdenCardProps {
  orden: Orden;
  onClick: () => void;

}

const OrdenCard: React.FC<OrdenCardProps> = ({ orden, onClick }) => {
  return (
    <div key={orden._id} className='OrdenCard-box'>
      <ul className='OrdenesPages-cards-list' onClick={onClick}>
        <li className='OrdenesPages-li'>
        <div className="OrdenCard-container">
            <div className="OrdenCard-ordenes-pages">
              <div className="OrdenCard-overlap">
                <header className="OrdenCard-header">
                  <div className="OrdenCard-rectangle" />
                </header>
                <div className="OrdenCard-header-info">
                  <div className="OrdenCard-servicio-title">{orden ? orden.id_solicitud_servicio.id_servicio.servicio : 'N/A'}</div>
                  <div className="OrdenCard-creation-date">{orden ? orden.creacion : 'N/A'}</div>
                  <div className="OrdenCard-oid-orden">ID: {orden ? orden._id : 'N/A'}</div>
                  <img className="OrdenCard-estado" alt="Estado" src="estado.png" />
                  <div className="OrdenCard-username">{orden ? orden.id_cerrador.username : 'N/A'}</div>
                  <img className="OrdenCard-update-icon" alt="Update icon" src="update-icon.png" />
                </div>
              </div>
              <div className="OrdenCard-overlap-group">
                <img className="OrdenCard-separator" alt="Separator" src="separator.svg" />
                <div className="OrdenCard-equipo-info">
                  <div className="OrdenCard-info-title">EQUIPO INFO</div>
                  <div className="OrdenCard-text-wrapper">{orden ? orden.id_solicitud_servicio.id_equipo.modelo_equipos.id_clase.clase : 'N/A'}</div>
                  <div className="OrdenCard-oid-equipo">SERIE</div>
                  <div className="OrdenCard-serialnumber">SN: {orden ? orden.id_solicitud_servicio.id_equipo.serie : 'N/A'}</div>
                </div>
              </div>
              <div className="OrdenCard-sede-info">
                <div className="OrdenCard-info-sede-title">SEDE INFO</div>
                <div className="OrdenCard-text-wrapper">{orden ? orden.id_solicitud_servicio.id_equipo.id_sede.sede_nombre : 'N/A'}</div>
                <div className="OrdenCard-oid-sede">CLIENTE INFO</div>
                <p className="OrdenCard-cliente-name">{orden ? orden.id_solicitud_servicio.id_equipo.id_sede.id_client.client_name : 'N/A'}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrdenCard;
