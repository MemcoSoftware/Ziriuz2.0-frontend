import react from 'react';
import axios from '../utils/config/axios.config';
import { AxiosRequestConfig } from 'axios';

export const getAllKatas = (token: string, limit?: number, page?: number) =>{

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