import React from 'react';
import { RepuestoEquipo } from '../../utils/types/RepuestoEquipo.type';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

interface RepuestoEquipoCardProps {
  repuestoEquipo: RepuestoEquipo;
  onClick: () => void;
}

const RepuestoEquipoCard: React.FC<RepuestoEquipoCardProps> = ({ repuestoEquipo, onClick }) => {
  return (
    <div key={repuestoEquipo._id} className='RepuestoEquipoCard-box'>
      <ul className='RepuestosEquiposPages-cards-list'>
        <li>
          <div className="RepuestoEquipoCard-equipospages" onClick={onClick}>
            <div className="RepuestoEquipoCard-overlap">
              <div className="RepuestoEquipoCard-equipospages-card">
                <div className="RepuestoEquipoCard-overlap-group">
                  <FaxOutlinedIcon className="RepuestoEquipoCard-div" />
                  <div className="RepuestoEquipoCard-text-wrapper">{repuestoEquipo.repuesto_name}</div>
                  <div className="RepuestoEquipoCard-equipospages-card-2">{repuestoEquipo.repuesto_cantidad}</div>
                  <div className="RepuestoEquipoCard-overlap-2">
                    {/* Agrega aquí otros detalles específicos de repuesto_equipo */}
                  </div>
                  <CheckOutlinedIcon className="RepuestoEquipoCard-check" />
                </div>
              </div>
              <div className="RepuestoEquipoCard-equipospages-2" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RepuestoEquipoCard;
