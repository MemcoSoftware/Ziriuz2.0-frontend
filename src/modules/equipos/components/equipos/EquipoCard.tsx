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
    <div key={equipo._id} className='box'>
      <ul className='EquiposPages-cards-list'>
        <li>
          <div className="equipospages" onClick={onClick}>
              <div className="overlap">
                <div className="equipospages-card">
                  <div className="overlap-group">
                    <FaxOutlinedIcon className="div" />
                    <div className="text-wrapper">{equipo.modelo_equipos.modelo}</div>
                    <div className="equipospages-card-2">{equipo.id_tipo.tipo}</div>
                    <div className="overlap-2">
                      <div className="equipospages-card-3">Location:</div>
                      <div className="equipospages-card-4">{equipo.id_sede ? equipo.id_sede.sede_nombre : 'Sede no especificada'}</div>
                    </div>
                    <div className="overlap-3">
                      <div className="equipospages-card-5">SN:</div>
                      <div className="equipospages-card-6">{equipo.serie}</div>
                    </div>
                    <CheckOutlinedIcon className="check" />
                  </div>
                </div>
                <div className="equipospages-2" />
              </div>
            </div>
        </li>
      </ul>
        
    </div>
  );
};

export default EquipoCard;
