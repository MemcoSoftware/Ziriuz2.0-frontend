import React from 'react';
import { MarcaEquipo } from '../../utils/types/MarcaEquipo.type';

interface MarcaEquipoCardProps {
  marcaEquipo: MarcaEquipo;
  onViewDetails: () => void;
}

const MarcaEquipoCard: React.FC<MarcaEquipoCardProps> = ({ marcaEquipo, onViewDetails }) => {
  return (
    <div key={marcaEquipo._id} className='MarcasEquipos-container-card'>
      <div className='MarcasEquipos-card-section'>
        <ul className='MarcasEquipos-cards-list'>
          <li>
            <a href='#' className='MarcasEquipos-card' onClick={onViewDetails}>
              <div className='MarcasEquipos-card-cover'></div>
              <div className='MarcasEquipos-card-overlay'>
                <div className='MarcasEquipos-card-header'>
                  <h2>{marcaEquipo._id}</h2>
                  <h3 className='MarcasEquipos-card-title'>{marcaEquipo.marca}</h3>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MarcaEquipoCard;
