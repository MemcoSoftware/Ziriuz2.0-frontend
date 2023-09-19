import React, { useState } from 'react';
import { deleteUserById } from '../../services/usersService';
import { AxiosResponse } from 'axios';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/DeleteUserButton.css'
interface DeleteUserButtonProps {
  userId: string; // ID del usuario a eliminar
  onDeleteSuccess: () => void; // Función para ejecutar después de la eliminación exitosa
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const loggedIn = useSessionStorage('sessionJWTToken'); // Obtenemos el token de sesión aquí

  const handleDeleteUser = () => {
    if (!isDeleting) {
      setIsDeleting(true);

      // Realiza la solicitud DELETE para eliminar al usuario
      deleteUserById(loggedIn, userId)
        .then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            onDeleteSuccess(); // Llama a la función de eliminación exitosa
          }
        })
        .catch((error: any) => {
          console.error(`Error al eliminar usuario: ${error}`);
          setIsDeleting(false);
        });
    }
  };

  return (
    <div>
      <div id='DeleteUser-app-cover'>
            <input
                type='checkbox'
                className=''
                id='DeleteUser-checkbox-input'
                onClick={handleDeleteUser}
                disabled={isDeleting}
            >
            </input>
                <div id="DeleteUser-bin-icon">
                    <div id="DeleteUser-lid"></div>
                        <div id="DeleteUser-box">
                            <div id="DeleteUser-box-inner">
                                <div id="DeleteUser-bin-lines"></div>
                            </div>
                        </div>
                    </div>
                <div id="DeleteUser-layer"></div>

        </div> 
  </div>
    
  );
};

export default DeleteUserButton;
