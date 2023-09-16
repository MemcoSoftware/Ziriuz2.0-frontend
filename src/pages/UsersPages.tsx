// UsersPages.tsx

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

export const UsersPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  // State of component
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Add state for search results
  const [searchResults, setSearchResults] = useState([]);

  // Add a state to keep track of the current display data (users or search results)
  const [displayData, setDisplayData] = useState([]);

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

  // Modify handleSearch to update searchResults
  const handleSearch = async (keyword: string) => {
    if (!loggedIn) {
      // Handle authentication if necessary
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

  useEffect(() => {
    // Update displayData whenever users or searchResults change
    setDisplayData(searchResults.length > 0 ? searchResults : users);
  }, [users, searchResults]);

  return (
    <div className='UserPages-container'>
      <DashboardMenuLateral />
      <SearchComponent onSearch={handleSearch} />

      {/* Render users or search results */}
      {displayData.length > 0 ? (
        <div className='UserPages-Container-Card'>
          {displayData.map((user: any) => (
            <UserCard
              key={user._id}
              user={user}
              onClick={() => navigateToUserDetail(user._id)}
            />
          ))}
        </div>
      ) : (
        <div>
          <h5>NO USERS TO LIST</h5>
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
