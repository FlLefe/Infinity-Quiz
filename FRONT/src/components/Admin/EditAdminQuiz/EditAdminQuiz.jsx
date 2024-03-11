import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { deleteQuizAdmin, getQuizByIdAdmin, updateQuizAdmin } from "../../../services/QuizApi";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "./EditAdminQuiz.scss";
import { toast } from "react-toastify";
import { APIError } from "../../../utils/ApiError";

export default function EditAdminQuiz() {
  const { handleLogout, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(getQuizByIdAdmin, userData.token, id);
  const [showForm, setShowForm] = useState(true);

  const [quizData, setQuizData] = useState({
    difficulty: "",
    theme: "",
    rate: "",
  });

  useEffect(() => {
    if (data) {
      setQuizData({
        difficulty: data.difficulty,
        theme: data.theme,
        rate: data.rate,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevState) => ({
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

  async function handleSave() {
    try {
      await updateQuizAdmin(userData.token, id, quizData);
      toast.success("Mise à jour réussie !");
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la mise à jour");
      }
    }
  }

  async function handleDelete() {
    try {
      await deleteQuizAdmin(userData.token, id);
      toast.success("Suppression réussie !");
      setShowForm(false);
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la suppression");
      }
    }
  }
  return (
    <div className="adminEditQuizContainer">
      {showForm && (
        <div className='adminEditQuizCard'>
          <h2>Modifier le quiz</h2>
          <label>Theme:</label>
          <input
            type='text'
            name='theme'
            value={quizData.theme}
            onChange={handleInputChange}
          />
          <label>Difficulté:</label>
          <select
            name='difficulty'
            value={quizData.difficulty}
            onChange={handleInputChange}
          >
            <option value='Facile'>Facile</option>
            <option value='Moyen'>Moyen</option>
            <option value='Avancé'>Avancé</option>
            <option value='Expert'>Expert</option>
            <option value='Extrême'>Extrême</option>
          </select>
            <label>Note:</label>
            <input
              type='number'
              name='rate'
              value={quizData.rate}
              onChange={handleInputChange}
            />
            <p>Auteur : {data.author_nickname}</p>

            <button onClick={handleSave}>
              Enregistrer
            </button>
            <button onClick={handleDelete}>
              Supprimer
            </button>
          <div className='adminEditQuestionCard'>
            {data.questions &&
              data.questions.map((data, index) => (
                <li key={index}>
                  <h3>{data.label}</h3>
                  <div className='adminAnswerOptions'>
                    <p>{data.answers.good_answer}</p>
                    <p>{data.answers.answer_1}</p>
                    <p>{data.answers.answer_2}</p>
                    <p>{data.answers.answer_3}</p>
                  </div>
                </li>
              ))}
          </div>
        </div>
      )}
      {!showForm && (
        <Link to={`/admin/quiz`}>
          <button>Retourner à la liste des quiz</button>
        </Link>
      )}
    </div>
  );
}
