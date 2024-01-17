import React from 'react';
import { Campo } from '../../utils/types/Campo.type';
import { useNavigate } from 'react-router-dom';

interface CamposCardProps {
  campo: Campo;
  onClick: () => void;
}

const CamposCard: React.FC<CamposCardProps> = ({ campo, onClick }) => {
  const navigate = useNavigate();

  return (
    <div key={campo._id} className='CamposCard-box' onClick={onClick}>
      <div className="CamposCard-campo-card">

          <div className="CamposCard-title">{campo.title}</div>
          <div className="CamposCard-id">{campo._id}</div>
          <div className="CamposCard-tipo">Tipo: {campo.id_tipo.nombre}</div>
        </div>
    </div>
  );
};

export default CamposCard;
