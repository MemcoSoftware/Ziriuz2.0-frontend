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
    </div>
  );
};

export default OrdenCard;
