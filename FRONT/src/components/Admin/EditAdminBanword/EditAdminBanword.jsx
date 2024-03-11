import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { deleteBanwordAdmin, getBanwordByIdAdmin, updateBanwordAdmin } from "../../../services/QuizApi";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { APIError } from "../../../utils/ApiError";
import "./EditAdminBanword.scss";

export default function EditAdminBanword() {
  const { handleLogout, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(getBanwordByIdAdmin, userData.token, id);
  const [showForm, setShowForm] = useState(true);

  const [banwordData, setBanwordData] = useState({
    label: "",
  });

  useEffect(() => {
    if (data) {
      setBanwordData({
        label: data.label,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBanwordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  const handleSave = async () => {
    try {
      await updateBanwordAdmin(userData.token, id, banwordData);
      toast.success("Mise à jour réussie !");
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la mise à jour");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBanwordAdmin(userData.token, id);
      toast.success("Suppression réussie !");
      setShowForm(false);
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className='adminEditBanwordContainer'>
      {showForm && (
        <div className='adminEditBanwordCard'>
          <h2>Modifier le banword</h2>
          <input
            className='searchBar'
            type='text'
            name='label'
            value={banwordData.label}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>
            Enregistrer
          </button>
          <button onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      )}

      <Link to={`/admin/banword`}>
        <button>Retourner à la liste des banwords</button>
      </Link>
    </div>
  );
}
