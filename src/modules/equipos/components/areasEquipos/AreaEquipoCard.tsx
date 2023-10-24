import React from 'react';
import { AreaEquipo } from '../../utils/types/AreaEquipo.type';

interface AreaEquipoCardProps {
  areaEquipo: AreaEquipo;
  onViewDetails: () => void;
}

const AreaEquipoCard: React.FC<AreaEquipoCardProps> = ({ areaEquipo, onViewDetails }) => {
  return (
    <div key={areaEquipo._id} className='AreasEquipos-container-card'>
      <div className='AreasEquipos-card-section'>
        <ul className='AreasEquipos-cards-list'>
          <li>
            <a href='#' className='AreasEquipos-card' onClick={onViewDetails}>
              <div className='AreasEquipos-card-cover'></div>
              <div className='AreasEquipos-card-overlay'>
                <div className='AreasEquipos-card-header'>
                    <h2>{areaEquipo._id}</h2>
                  <h3 className='AreasEquipos-card-title'>{areaEquipo.area}</h3>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AreaEquipoCard;
