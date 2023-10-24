import axios from '../../../utils/config/axios.config';
import { AxiosRequestConfig } from 'axios';

// Get all ModelosEquipos
export const getAllModeloEquipos = (token: string, limit?: number, page?: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
    params: {
      limit,
      page,
    },
  };

  return axios
    .get('/equipos/modelo', options)
    .then((response) => response.data.modeloEquipos)
    .catch((error) => handleError(error));
};

// Get a ModeloEquipo by ID
export const getModeloEquipoById = (token: string, id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
    params: {
      id,
    },
  };

  return axios
    .get(`/equipos/modelo/`, options)
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

// Create a new ModeloEquipo
export const createModeloEquipo = (token: string, modeloEquipoData: any) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
  };

  return axios
    .post('/equipos/modelo', modeloEquipoData, options)
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

// Update a ModeloEquipo by ID
export const updateModeloEquipo = (token: string, id: string, modeloEquipoData: any) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
  };

  return axios
    .put(`/equipos/modelo?id=${id}`, modeloEquipoData, options)
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

// Delete a ModeloEquipo by ID
export const deleteModeloEquipoById = (token: string, id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token,
    },
    params: {
      id,
    },
  };

  return axios
    .delete(`/equipos/modelo/`, options)
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

// Handle errors
const handleError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 500) {
      console.error(`Error 500: ${data}`);
      // You can handle the error and display a message to the user here.
    }
  } else {
    console.error('Unknown error:', error);
    // Handle other errors here.
  }
  throw error;
};
