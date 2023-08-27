import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';



export const UsersPages = () =>{

    let loggedIn = useSessionStorage('sessionJWTToken')

    let navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn){
            return navigate('/login')
        }
    }, [loggedIn])
    /**
     * Method to navigate to User Data
     * @param id of User to navigate to
     * 
     */

    const navigateToUserDetail = (id: number) =>{
        navigate(`/users/${id}`);
    }


    return (
        <div>
            <h1>Users List</h1>
        </div>    )
}