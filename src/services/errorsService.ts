// En axiosErrorHandler.ts
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosErrorHandler = () => {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 500) {
        // El servidor respondió con un estado 500, lo que indica un error interno del servidor.
        console.log('Intercepted a 500 error response');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  
};

export default useAxiosErrorHandler;
