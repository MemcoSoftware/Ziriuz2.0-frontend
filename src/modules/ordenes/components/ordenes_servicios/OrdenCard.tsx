import React from 'react';
import { Orden } from '../../utils/types/Orden.type'; // Asegúrate de ajustar la ruta correcta

interface OrdenCardProps {
  orden: Orden;
  onClick: () => void;

}

const OrdenCard: React.FC<OrdenCardProps> = ({ orden, onClick }) => {
  return (
    <div key={orden._id} className='OrdenCard-box'>
      <ul className='OrdenesPages-cards-list'>
        <li>
          <div className="OrdenCard-ordenespages" onClick={onClick}>
            <div className="OrdenCard-overlap">
              <div className="OrdenCard-ordenespages-card">
                <div className="OrdenCard-overlap-group">
                  {/* Aquí puedes renderizar los campos de la orden */}
                  <p>ID: {orden._id}</p>
                  <p>Fecha de creación: {orden.creacion}</p>
                  <p>Fecha de cierre: {orden.cierre}</p>
                  {/* Renderiza más campos según sea necesario */}
                </div>
              </div>
              <div className="OrdenCard-ordenespages-2" />
            </div>
          </div>
        </li>
      </ul>

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
                  <div className="OrdenCard-username">user.name</div>
                  <img className="OrdenCard-update-icon" alt="Update icon" src="update-icon.png" />
                </div>
              </div>
              <div className="OrdenCard-overlap-group">
                <img className="OrdenCard-separator" alt="Separator" src="separator.svg" />
                <div className="OrdenCard-equipo-info">
                  <div className="OrdenCard-info-title">EQUIPO INFO</div>
                  <div className="OrdenCard-text-wrapper">EQUIPO CLASS</div>
                  <div className="OrdenCard-oid-equipo">SERIE</div>
                  <div className="OrdenCard-serialnumber">SN: serialnumber</div>
                </div>
              </div>
              <div className="OrdenCard-sede-info">
                <div className="OrdenCard-info-sede-title">SEDE INFO</div>
                <div className="OrdenCard-text-wrapper">SEDE NAME</div>
                <div className="OrdenCard-oid-sede">CLIENTE INFO</div>
                <p className="OrdenCard-cliente-name">UNIVERSIDAD COOPERATIVA DE COLOMBIA CTO 05MED-0000012775</p>
              </div>
            </div>
          </div>

    </div>
  );
};

export default OrdenCard;
