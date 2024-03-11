import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { deleteUserAdmin, getUserByIdAdmin, updateUserAdmin } from "../../../services/QuizApi";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "./EditAdminUser.scss";
import { toast } from "react-toastify";
import { APIError } from "../../../utils/ApiError";

export default function EditAdminUser() {
  const { handleLogout, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(getUserByIdAdmin, userData.token, id);
  const [showForm, setShowForm] = useState(true);

  const [userDataUpdate, setUserDataUpdate] = useState({
    nickname: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (data) {
      setUserDataUpdate({
        nickname: data.nickname,
        email: data.email,
        role: data.role,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDataUpdate((prevState) => ({
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
      await updateUserAdmin(userData.token, id, userDataUpdate);
      toast.success("Mise à jour réussie !");
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la mise à jour");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserAdmin(userData.token, id);
      toast.success("Suppression réussie !");
      setShowForm(false);
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className='adminEditUserContainer'>
      {showForm && (
        <div className='adminEditUserCard'>
          <h2>Modifier l'utilisateur</h2>
          <label>Pseudo:</label>
          <input
            className='inputTextMod'
            type='text'
            name='nickname'
            value={userDataUpdate.nickname}
            onChange={handleInputChange}
          />
          <label>Mail:</label>
          <input
            type='text'
            name='email'
            value={userDataUpdate.email}
            onChange={handleInputChange}
          />
          <label>Role:</label>
          <select className='adminEditUserSelect' name='role' value={userDataUpdate.role} onChange={handleInputChange}>
            <option value='member'>Membre</option>
            <option value='admin'>Administrateur</option>
          </select>
          <p>Prompts restants : {data.prompt}</p>
          <button onClick={handleSave}>
            Enregistrer
          </button>
          <button onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      )}

      <Link to={`/admin/user`}>
        <button>Retourner à la liste des utilisateurs</button>
      </Link>
    </div>
  );
}
