import react from 'react';
import axios from '../utils/config/axios.config';
import { AxiosRequestConfig } from 'axios';


export const getAllUsers = (token: string, limit?: number, page?: number) => {
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit: limit,
            page: page
        }
    }
    
    return axios.get('/users', options)
        .catch(error => {
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
}


export const getUserById = (token: string, id: string) => {
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }
    }
    
    return axios.get('/users/', options)
        .catch(error => {
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
}