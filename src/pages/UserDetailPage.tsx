import React, { useEffect, useState } from 'react';

// React Router DOM Imports
import { useNavigate, useParams } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getUserById } from '../services/usersService';
import { AxiosResponse } from 'axios';
import { User } from '../utils/types/User.type';

export const UserDetailPage = () => {
  let loggedIn = useSessionStorage('sessionJWTToken');

  let navigate = useNavigate();
  // Find id from params
  let { id } = useParams();
  console.log(id);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      if (id) {
        getUserById(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              setUser(response.data);
              console.table(response.data);
            }
          })
          .catch((error: any) => console.error(`[USER BY ID ERROR]: ${error}`));
      } else {
        return navigate('/users');
      }
    }
  }, [loggedIn]);

  // Variable to navigate

  return (
    <div>
      <h1>User Detail Page: {id}</h1>
      {user ? (
        <div className='user-data'>
          <h2>{user.name}</h2>
          <h3>{user.number}</h3>
          <h3>{user.username}</h3>
          <h3>{user.cedula}</h3>
          <h3>{user.email}</h3>
          <h3>{user.telefono}</h3>
          <h3>{user.more_info}</h3>
          {user.roles && user.roles.length > 0 && (
            <div>
              <h3>Roles:</h3>
              <ul>
                {user.roles.map((role: any) => (
                  <li key={role._id}>{role.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Loading data...</h2>
        </div>
      )}
    </div>
  );
};