import { toast } from 'react-toastify';

export function APIError(error, handleLogout, navigate) {

    if (error.status === 401) {
      handleLogout();
    }
    if (error.status === 422) {
      toast.warn(error.message);
    }
    if (error.status === 429) {
      navigate('/softban');
    }
  }