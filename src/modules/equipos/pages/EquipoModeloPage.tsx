import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllModeloEquipos } from '../services/equiposModeloService';
import { EquiposModelo } from '../utils/types/EquipoModelo.type';
import EquipoModeloCard from '../components/equiposModelos/EquipoModeloCard';
import { useNavigate } from 'react-router-dom';
import './styles/EquipoModeloPage.css'
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import SearchModelosEquipos from '../components/searchEquiposTools/SearchModeloEquipos';
import RegisterModeloEquipoButton from '../components/equiposModelos/RegisterModeloEquipoButton';

const EquipoModeloPage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [modelosEquipos, setModelosEquipos] = useState<Array<EquiposModelo>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Nuevo estado


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
    navigate(`/equipos/modelo/${id}`);
  };

  return (
    <div className='EquipoModeloPage-container'>
      <DashboardMenuLateral />
      <RegisterModeloEquipoButton />
      <SearchModelosEquipos // Renderiza el componente SearchModelosEquipos
        showSearchResults={showSearchResults} // Inicialmente, no muestra los resultados de la búsqueda
        setShowSearchResults={setShowSearchResults} // Esta función no se utiliza inicialmente
      />
      <div className='EquipoModeloPage-Container-Card'>

          {showSearchResults ? (
            <p></p>
            ):
            (
              
              modelosEquipos.map((modeloEquipo) => (
                <EquipoModeloCard
                key={modeloEquipo._id}
                modeloEquipo={modeloEquipo}
                onViewDetails={() => handleViewDetails(modeloEquipo._id)}
                />
                ))
                
                )}    
      </div>
      
    </div>
  );
};

export default EquipoModeloPage;
