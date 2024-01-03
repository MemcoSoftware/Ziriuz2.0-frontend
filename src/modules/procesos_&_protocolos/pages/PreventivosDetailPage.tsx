import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getPreventivoById } from '../services/preventivosService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditPreventivoButton from '../components/preventivos/EditPreventivoButton';
import { Preventivo } from '../utils/types/Preventivo.type';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FlakyOutlinedIcon from '@mui/icons-material/FlakyOutlined';

import './styles/PreventivoDetailPage.css';

const PreventivoDetailPage: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams();
  const [preventivo, setPreventivo] = useState<Preventivo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    if (!id) {
      console.error('ID del preventivo no encontrado en la URL');
      return;
    }

    const fetchPreventivo = async () => {
      try {
        const token = loggedIn;
        const result = await getPreventivoById(token, id);

        setPreventivo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del preventivo:', error);
      }
    };

    fetchPreventivo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    console.log('Preventivo editado con éxito');
    setIsEditing(false);
  };

  return (
    <div>
      <DashboardMenuLateral />

      {isEditing ? (
        <EditPreventivoButton
          preventivoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={preventivo}
        />
      ) : (
      
                     <div className="PreventivoDetailPage-box">
                        <div className="PreventivoDetailPage-preventivo-detail">
                          <div className="PreventivoDetailPage-overlap-group">
                            <div className="PreventivoDetailPage-overlap">
                              <div className="PreventivoDetailPage-title">PREVENTIVO TITLE</div>
                              <CheckOutlinedIcon className="PreventivoDetailPage-check-funcionamiento" />
                              <FlakyOutlinedIcon className="PreventivoDetailPage-icon" />
                              <div className="PreventivoDetailPage-code">Code: {preventivo ? preventivo.codigo : ''}</div>
                              <div className="PreventivoDetailPage-version">Versión: {preventivo ? preventivo.version : ''}</div>
                              <div className="PreventivoDetailPage-date">Date: {preventivo ? preventivo.fecha : ''}</div>
                              <EditOutlinedIcon className="PreventivoDetailPage-edit-icon"/>
                              <DeleteOutlinedIcon className="PreventivoDetailPage-delete-icon"/>
                              <div className="PreventivoDetailPage-oid">ID: {preventivo ? preventivo._id : ''}</div>
                            </div>
                            <div className="PreventivoDetailPage-div">
                              <div className="PreventivoDetailPage-text-wrapper">PROTOCOLOS CUALITATIVOS</div>
                            <ul className="PreventivoDetailPage-ul">
                            {preventivo && preventivo.cualitativo
                                  ? preventivo.cualitativo.map((item: any) => (
                                    <li className="PreventivoDetailPage-div-wrapper" key={item._id}>
                                      {item.title}
                                      {/* <li className="PreventivoDetailPage-text-wrapper-2" key={item._id}>{item.title}</li> */}
                                    </li>
                                    ))
                                  : null}
                            </ul>
                            </div>
                            <div className="PreventivoDetailPage-overlap-2">
                              <div className="PreventivoDetailPage-text-wrapper">PROTOCOLOS DE MANTENIMIENTO</div>
                              <div className="PreventivoDetailPage-div-wrapper">
                                <p className="PreventivoDetailPage-text-wrapper-2">Revision estado de encendido de motor</p>
                              </div>
                            </div>
                            <div className="PreventivoDetailPage-overlap-3">
                              <div className="PreventivoDetailPage-otros-name">OTROS PROTOCOLOS</div>
                              <div className="PreventivoDetailPage-otros-text-wrapper">
                                <p className="PreventivoDetailPage-otros-text">Revision estado de encendido de motor</p>
                              </div>
                            </div>
                            <div className="PreventivoDetailPage-overlap-4">
                              <div className="PreventivoDetailPage-cuantitativo-title">PROTOCOLOS CUANTITATIVOS</div>
                              <div className="PreventivoDetailPage-cuantitativo-text-wrapper">
                                <p className="PreventivoDetailPage-cuantitativo-text">REVISION VOLTAJE DE ENTRADA 440 VAC</p>
                              </div>
                              <div className="PreventivoDetailPage-minimo">MÍNIMO</div>
                              <div className="PreventivoDetailPage-maximo">MÁXIMO</div>
                              <div className="PreventivoDetailPage-unidad">UNIDAD</div>
                              <div className="PreventivoDetailPage-separator"/>
                              <div className="PreventivoDetailPage-img"/>
                              <div className="PreventivoDetailPage-separator-2"/>
                              <div className="PreventivoDetailPage-minimo-value">220</div>
                              <div className="PreventivoDetailPage-maximo-value">440</div>
                              <div className="PreventivoDetailPage-unidad-value">V</div>
                            </div>
                          </div>
                        </div>
                      </div>

       

      )}
    </div>
  );
};

export default PreventivoDetailPage;



{/* <div className="sPreventivoDetailPage-box">
<div className="sPreventivoDetailPage-complete-details">
  <div className="sPreventivoDetailPage-overlap-group">
    <div className="sPreventivoDetailPage-overlap">
      <p>ID: {preventivo ? preventivo._id : ''}</p>
      <p>Título: {preventivo ? preventivo.title : ''}</p>
      <p>Código: {preventivo ? preventivo.codigo : ''}</p>
      <p>Versión: {preventivo ? preventivo.version : ''}</p>
      <p>Fecha: {preventivo ? preventivo.fecha : ''}</p>

      <p>Cualitativo:</p>
      <ul>
        {preventivo && preventivo.cualitativo
          ? preventivo.cualitativo.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))
          : null}
      </ul>

      <p>Mantenimiento:</p>
      <ul>
        {preventivo && preventivo.mantenimiento
          ? preventivo.mantenimiento.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))
          : null}
      </ul>

      <p>Cuantitativo:</p>
      <ul>
        {preventivo && preventivo.cuantitativo
          ? preventivo.cuantitativo.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))
          : null}
      </ul>

      <p>Otros:</p>
      <ul>
        {preventivo && preventivo.otros
          ? preventivo.otros.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))
          : null}
      </ul>

    </div>
  </div>
</div> */}
