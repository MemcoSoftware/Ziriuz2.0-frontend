import React from 'react';
import { TipoEquipo } from '../../utils/types/TipoEquipo.type';

interface TipoEquipoCardProps {
  tipoEquipo: TipoEquipo;
  onViewDetails: () => void;
}

const TipoEquipoCard: React.FC<TipoEquipoCardProps> = ({ tipoEquipo, onViewDetails }) => {
  return (
    <div key={tipoEquipo._id} className='TiposEquipos-container-card'>
      <div className='TiposEquipos-card-section'>
        <ul className='TiposEquipos-cards-list'>
          <li>
            <a href='#' className='TiposEquipos-card' onClick={onViewDetails}>
              <div className='TiposEquipos-card-cover'></div>
              <div className='TiposEquipos-card-overlay'>
                <div className='TiposEquipos-card-header'>
                  <h2>{tipoEquipo._id}</h2>
                  <h3 className='TiposEquipos-card-title'>{tipoEquipo.tipo}</h3>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TipoEquipoCard;
