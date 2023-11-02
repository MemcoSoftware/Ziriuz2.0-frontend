import React from 'react';
import { Equipo } from '../../utils/types/Equipo.type';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
interface EquipoCardProps {
  equipo: Equipo;
  onClick: () => void;
}

const EquipoCard: React.FC<EquipoCardProps> = ({ equipo, onClick }) => {
  return (
    <div key={equipo._id} className='EquipoCard-box'>
      <ul className='EquiposPages-cards-list'>
        <li>
          <div className="EquipoCard-equipospages" onClick={onClick}>
              <div className="EquipoCard-overlap">
                <div className="EquipoCard-equipospages-card">
                  <div className="EquipoCard-overlap-group">
                    <FaxOutlinedIcon className="EquipoCard-div" />
                    <div className="EquipoCard-text-wrapper">{equipo.modelo_equipos.modelo}</div>
                    <div className="EquipoCard-equipospages-card-2">{equipo.id_tipo.tipo}</div>
                    <div className="EquipoCard-overlap-2">
                      <div className="EquipoCard-equipospages-card-3">Location:</div>
                      <div className="EquipoCard-equipospages-card-4">{equipo.id_sede ? equipo.id_sede.sede_nombre : 'Sede no especificada'}</div>
                    </div>
                    <div className="EquipoCard-overlap-3">
                      <div className="EquipoCard-equipospages-card-5">SN:</div>
                      <div className="EquipoCard-equipospages-card-6">{equipo.serie}</div>
                    </div>
                    <CheckOutlinedIcon className="EquipoCard-check" />
                  </div>
                </div>
                <div className="EquipoCard-equipospages-2" />
              </div>
            </div>
        </li>
      </ul>
        
    </div>
  );
};

export default EquipoCard;
