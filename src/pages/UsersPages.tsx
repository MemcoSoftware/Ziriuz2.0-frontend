import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllUsers } from '../services/usersService';
import { AxiosResponse } from 'axios';
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';
import './styles/UsersPages.css';
import DefaultUserImg from './img/defaultUserImg.png';
import UserCard from '../components/users/UserCard';
import SearchUsersResults from '../components/searchTools/SearchUsersResults';
import SearchComponent from '../components/searchTools/SearchUsers';

export const UsersPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const [users, setUsers] = useState({ list: [], totalPages: 1, currentPage: 1 });

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
            setUsers({ list: users, totalPages, currentPage });
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

  return (
    <div className='UserPages-container'>
      <DashboardMenuLateral />
      <SearchComponent />

      <div className='UserPages-Container-Card'>
        {users.list.map((user: any) => (
          <UserCard key={user._id} user={user} onClick={() => navigateToUserDetail(user._id)} />
        ))}
      </div>

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
