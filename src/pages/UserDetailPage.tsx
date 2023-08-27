import React, { useEffect } from 'react';

// React Router DOM Imports
import { useNavigate, useParams} from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

export const UserDetailPage = () =>{
    let loggedIn = useSessionStorage('sessionJWTToken')
    
    let navigate = useNavigate();
    // Find id from params
    let { id } = useParams();
    
        useEffect(() => {
            if(!loggedIn){
                return navigate('/login')
            }
        }, [loggedIn]);

    //Variable to navigate

    return (
        <div>
            <h1>User Detail Page</h1>
        </div>    )


}