import react from 'react';
import axios from '../utils/config/axios.config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getAllUsers = (token: string, limit?: number, page?: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
    params: {
      limit: limit,
      page: page,
    },
  };

  return axios
    .get('/users', options)
    .catch((error) => {
      // Aquí manejamos el error de la solicitud
      if (error.response) {
        const { status } = error.response;
        if (status === 500) {
          // Token inválido o expirado
          // Redirigir al usuario a la página de inicio de sesión (/login)
          window.location.href = '/login';
        }
      }
      throw error; // Puedes manejar el error de otra manera si es necesario
    });
};

export const getUserById = (token: string, id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
    params: {
      id,
    },
  };

  return axios.get('/users/', options).catch((error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 500) {
        // Token inválido o expirado
        // Redirigir al usuario a la página de inicio de sesión (/login)
        window.location.href = '/login';
      }
    }
    throw error;
  });
};

export const searchUsersByKeyword = async (token: string, keyword: string): Promise<AxiosResponse> => {
  try {
    // Crear un objeto de cuerpo (body) con la propiedad 'keyword'
    const requestBody = { keyword };

    const response = await axios.post(
      '/search',
      requestBody, // Utilizar el objeto de cuerpo creado
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    console.log('Search Response:', response);

    if (response.status === 200 && response.data.users) {
      return response;
    } else {
      console.error('Search Error: Invalid response from server');
      throw new Error(`Error searching Users`);
    }
  } catch (error) {
    console.error('Search Error:', error);
    throw error;
  }
};
