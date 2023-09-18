import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllUsers, searchUsersByKeyword } from '../services/usersService';
import { AxiosResponse } from 'axios';
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';
import './styles/UsersPages.css';
import DefaultUserImg from './img/defaultUserImg.png';
import SearchComponent from '../components/searchTools/SearchUsers';
import UserCard from '../components/users/UserCard';
import SearchResults from '../components/searchTools/SearchUsersResults'; // Importa el componente de resultados de búsqueda

export const UsersPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // Lista de todos los usuarios
  const [searchResults, setSearchResults] = useState([]); // Lista de usuarios filtrados
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      getAllUsers(loggedIn, 9, 1)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.users &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            console.table(response.data);
            let { users, totalPages, currentPage } = response.data;
            setUsers(users);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else {
            throw new Error(`Error obtaining Users ${response.data}`);
          }
        })
        .catch((error) => console.error(`[GET ALL USERS ERROR] ${error}`));
    }
  }, [loggedIn]);

  const navigateToUserDetail = (id: string) => {
    navigate(`/users/${id}`);
  };

  const handleSearch = async (keyword: string) => {
    if (!loggedIn) {
      // Manejar la autenticación si es necesario
      return;
    }

    try {
      const response = await searchUsersByKeyword(loggedIn, keyword);

      if (response.status === 200 && response.data.users) {
        setSearchResults(response.data.users);
      } else {
        throw new Error(`Error searching Users ${response.data}`);
      }
    } catch (error) {
      console.error(`[SEARCH USERS ERROR] ${error}`);
    }
  };

  return (
    <div className='UserPages-container'>
      <DashboardMenuLateral />
      <SearchComponent onSearch={handleSearch} />

      {/* Renderiza el componente adecuado según si hay resultados de búsqueda */}
      {searchResults.length > 0 ? (
        <SearchResults users={searchResults} />
      ) : (
        <div className='UserPages-Container-Card'>
          {users.map((user: any) => (
            <UserCard key={user._id} user={user} onClick={() => navigateToUserDetail(user._id)} />
          ))}
        </div>
      )}

      <button
        className='RegisterUser-button-redirect'
        type='submit'
        value='register'
        onClick={() => navigate('/register')}
      >
        Crear nuevo Usuario
      </button>
    </div>
  );
};
