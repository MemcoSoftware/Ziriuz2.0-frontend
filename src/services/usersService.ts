import react from 'react';
import axios from '../utils/config/axios.config';
import { AxiosRequestConfig } from 'axios';

export const getAllUsers = (token: string, limit?: number, page?: number) =>{

    //http://localhost:8000/api/users?limit=1?page=1
    // Add headers with JWT in x-access-token
    
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

}


export const getUserById = (token: string, id: string) =>{
    //http://localhost:8000/api/users?id:XXXXXXXXXX
    // Add headers with JWT in x-access-token    
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }
    }
    return axios.get('/users/', options)

}