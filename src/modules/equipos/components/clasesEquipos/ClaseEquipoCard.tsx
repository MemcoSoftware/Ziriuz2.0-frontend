import React from 'react';
import { ClaseEquipo } from '../../utils/types/ClaseEquipo.type';

interface ClaseEquipoCardProps {
  claseEquipo: ClaseEquipo;
  onViewDetails: () => void;
}

const ClaseEquipoCard: React.FC<ClaseEquipoCardProps> = ({ claseEquipo, onViewDetails }) => {
  return (
    <div key={claseEquipo._id} className='ClasesEquipos-container-card'>
      <div className='ClasesEquipos-card-section'>
        <ul className='ClasesEquipos-cards-list'>
          <li>
            <a href='#' className='ClasesEquipos-card' onClick={onViewDetails}>
              <div className='ClasesEquipos-card-cover'></div>
              <div className='ClasesEquipos-card-overlay'>
                <div className='ClasesEquipos-card-header'>
                  <h2>{claseEquipo._id}</h2>
                  <h3 className='ClasesEquipos-card-title'>{claseEquipo.clase}</h3>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClaseEquipoCard;
