import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllUsers } from '../services/usersService';
import { AxiosResponse } from 'axios';
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';
import './styles/UsersPages.css';
import DefaultUserImg from './img/defaultUserImg.png';

export const UsersPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  // State of component
  const [users, setUsers] = useState([]); // Initial Users is empty
  const [totalPages, setTotalPages] = useState(1); // Initial default value
  const [currentPage, setCurrentPage] = useState(1); // Initial default value



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

  /**
   * Method to navigate to User Data
   * @param id of User to navigate to
   */
  const navigateToUserDetail = (id: string) => {
    console.log('Navigating to user detail with ID:', id);
    navigate(`/users/${id}`);
  };

  return (
    <div className='UserPages-container'>
      <DashboardMenuLateral />
      {users.length > 0 ? (
        // IF IS TRUE PRINT THIS:
      <div className='UserPages-Container-Card'>
          {users.map((user: any) => (
            <div key={user._id} className='UsersPages-container-card'>
        <div className='UsersPages-card-section'>
          <ul className='UsersPages-cards-list'>
            <li>
              <a type='#' className='UsersPages-card' onClick={() => navigateToUserDetail(user._id)}>
                <div className='UsersPages-card-cover'></div>
                <div className='UsersPages-card-overlay'>
                  <div className='UsersPages-card-header'>
                    <img src={DefaultUserImg} className='UsersPages-card-UserImage' alt="" height="70px" width="70px" ></img>
                    <div className='UsersPages-card-header-text'>
                      <h3 className='UsersPages-card-title'>{user.name}</h3>
                      {user.roles.map((role: any) => (
                      <span key={role._id} className='UsersPages-card-status'>{role.name}</span>
                      ))}
                      <br></br>
                      <span className='UsersPages-card-status'># {user.number}</span>
                    </div>
                  </div>
                    <p className='UsersPages-card-description'>CC {user.cedula}</p>
                    <p className='UsersPages-card-description'>{user.email}</p>
                </div>
              </a>
            </li>
          </ul>
          </div>
            </div>
          ))}
        
      </div>
      ) : (
        // IF IS FALSE PRINT THIS:
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
