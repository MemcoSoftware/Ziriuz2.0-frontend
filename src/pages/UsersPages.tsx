import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllUsers } from '../services/usersService';
import { AxiosResponse } from 'axios';



export const UsersPages = () =>{

    let loggedIn = useSessionStorage('sessionJWTToken')

    let navigate = useNavigate();
    // State of component
    const [users, setUsers] = useState([])// Initial Users is empty
    const [totalPages, setTotalPages] = useState(1) // Initial default value
    const [currentPage, setCurrentPage] = useState(1) // Initial default value
    useEffect(() => {
        if(!loggedIn){
            return navigate('/login')
        }else{
            getAllUsers(loggedIn, 2, 1).then((response: AxiosResponse)=>{
                if(response.status === 200 && response.data.users && response.data.totalPages && response.data.currentPage){
                    console.table(response.data);
                    let {users, totalPages, currentPage} = response.data;
                    setUsers(users);
                    setTotalPages(totalPages);
                    setCurrentPage(currentPage);
                }else{
                    throw new Error (`Error obtaining Users ${response.data}` )
                }

            }).catch((error)=> console.error(`[GET ALL USERS ERROR] ${error}`))
        }
    }, [loggedIn])
    /**
     * Method to navigate to User Data
     * @param id of User to navigate to
     * 
     */

    const navigateToUserDetail = (id: string) =>{
        console.log('Navigating to user detail with ID:', id);
        navigate(`/users/${id}`);
    }


    return (
        <div>
            <h1>Users List</h1>
            { users.length > 0 ?

                // IF IS TRUE PRINT THIS: 
                <div> 

                        {users.map((user:any)=>
                    
                        (
                            <div key={user._id}>
                                <h4>{user.number}</h4>
                                <h4 onClick={()=> navigateToUserDetail(user._id)}>{user.name}</h4>
                                <h4>{user.email}</h4>
                                <h4>{user.more_info}</h4>
                            </div>
                        )
                    )
                }   
                    
                        
                 </div>

             
            :
                // IF IS FALSE PRINT THIS:
                <div>
                    <h5>NO USERS TO LIST</h5>
                </div>

            }
        </div>    )
}