import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllModeloEquipos } from '../services/equiposModeloService';
import { EquiposModelo } from '../utils/types/EquipoModelo.type';
import EquipoModeloCard from '../components/equiposModelos/EquipoModeloCard';
import { useNavigate } from 'react-router-dom';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';

const EquipoModeloPage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [modelosEquipos, setModelosEquipos] = useState<Array<EquiposModelo>>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      getAllModeloEquipos(loggedIn)
        .then((data: EquiposModelo[]) => {
          setModelosEquipos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [loggedIn]);

  const handleViewDetails = (id: string) => {
    console.log("ID a redirigir:", id);
      navigate(`/equipos/modelo/${id}`);
    
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Modelos de Equipos</h1>
      {loggedIn ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {modelosEquipos.map((modeloEquipo) => (
              <li key={modeloEquipo._id}>
                <EquipoModeloCard
                  modeloEquipo={modeloEquipo}
                  onViewDetails={() => handleViewDetails(modeloEquipo._id)} // Pass the ID here
                />
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Please log in to view data.</p>
      )}
    </div>
  );
};

export default EquipoModeloPage;
