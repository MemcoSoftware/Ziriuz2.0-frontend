import React from 'react';
import { EquiposModelo } from '../../utils/types/EquipoModelo.type';

interface EquipoModeloCardProps {
  modeloEquipo: EquiposModelo;
  onViewDetails: () => void;
}

const EquipoModeloCard: React.FC<EquipoModeloCardProps> = ({ modeloEquipo, onViewDetails }) => {
  return (
    <div key={modeloEquipo._id} className='EquiposPages-container-card'>
      <div className='EquiposPages-card-section'>
        <ul className='EquiposPages-cards-list'>
          <li>
            <a type='#' className='EquiposPages-card' onClick={onViewDetails}>
              <div className='EquiposPages-card-cover'></div>
              <div className='EquiposPages-card-overlay'>
                <div className='EquiposPages-card-header'>
                  <h3 className='EquiposPages-card-title'>{modeloEquipo.modelo}</h3>
                  <p>Precio: {modeloEquipo.precio}</p>
                  <p>Marca: {modeloEquipo.id_marca ? modeloEquipo.id_marca.marca : 'N/A'}</p>
                  <p>Clase: {modeloEquipo.id_clase ? modeloEquipo.id_clase.clase : 'N/A'}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EquipoModeloCard;
