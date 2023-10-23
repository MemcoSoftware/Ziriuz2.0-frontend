import React from 'react';
import { Equipo } from '../../utils/types/Equipo.type';

interface EquipoCardProps {
  equipo: Equipo;
  onClick: () => void;
}

const EquipoCard: React.FC<EquipoCardProps> = ({ equipo, onClick }) => {
  return (
    <div key={equipo._id} className='EquiposPages-container-card'>
      <div className='EquiposPages-card-section'>
        <ul className='EquiposPages-cards-list'>
          <li>
            <a type='#' className='EquiposPages-card' onClick={onClick}>
              <div className='EquiposPages-card-cover'></div>
              <div className='EquiposPages-card-overlay'>
                <div className='EquiposPages-card-header'>
                  <h3 className='EquiposPages-card-title'>{equipo.serie}</h3>
                  <p>Modelo: {equipo.modelo_equipos.modelo}</p>
                  <p>Sede: {equipo.id_sede ? equipo.id_sede.sede_nombre : 'Sede no especificada'}</p>
                  <p>Ubicación: {equipo.ubicacion}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EquipoCard;
