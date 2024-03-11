import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { APIError } from "../utils/ApiError";

function useFetch(apiFunction, token, ...args) {

  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFunction(token, ...args);
        setData(response);
      } catch (error) {
        if (!APIError(error, handleLogout, navigate)) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  return { data, loading, error };
}

export default useFetch;