import { useContext, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import QuizManager from "../../components/QuizManager/QuizManager";
import { generateQuiz } from "../../services/QuizApi";
import { AuthContext } from "../../contexts/AuthContext";
import "./QuizIa.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function QuizIa() {
  const { userData, handleLogout, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [inputData, setInputData] = useState({
    difficulty: "Facile",
    theme: "",
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [withTimer, setWithTimer] = useState(false);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);

  {/* Theme input, limit 30 and regex */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (/^[a-zA-Z0-9\u00C0-\u00FF\s']*/i.test(value) && value.length <= 30) {
      setInputData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setIsCreateButtonDisabled(value.length < 2);
  };

  {/* Click Function to launch quiz with or without timer */}
  const handleStartQuiz = (withTimer) => {
    setQuizStarted(true);
    setWithTimer(withTimer);
  };

  {/* Click Function to generate the quiz */}
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await generateQuiz(userData.token, inputData);
      response.ia = true; {/* add IA status for recap */}
      setQuizData(response);
    } catch (error) {
      if (error.status === 401) {
        handleLogout();
      } else if (error.status === 423) {
        toast.warn("Vous avez consommé tous vos token");
      } else if (error.status === 403) {
        toast.warn(error.message); {/* Error if the user try to generate with a banword */}
      } else if (error.status === 429) {
        navigate("/softban");
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Nous sommes désolé une erreur est survenue</p>;
  }

  {/* Return when the quiz has been generated, some details about him */}
  if (quizData && !quizStarted) {
    return (
      <div className='quizIaDetailsContainer'>
            <div className='quizIaDetails'>
              <h2>Votre quiz a été généré !</h2>
              <h2>Theme : {quizData.theme}</h2>
              <p> {quizData.difficulty}</p>
            </div>
            <div className='quizIaButtons'>
            <button onClick={() => handleStartQuiz(false)}>
                Lancer le quiz sans timer
                <img src='/icons/coffee.svg' alt='Icone timer'></img>
              </button>
              <button onClick={() => handleStartQuiz(true)}>
                Lancer le quiz avec timer
                <img src='/icons/clock.svg' alt='Icone timer'></img>
              </button>
            </div>
            <Link to={isLoggedIn ? "/quiz/all" : "/quiz"} className='startBtn'>
              Retourner à la liste des quiz
            </Link>
          </div>
    );
  }

  {/* Return when quiz launched, return the component QuizManager where quizData is the generated quiz*/}
  if (quizData && quizStarted) {
    return (
        <QuizManager quizData={quizData} withTimer={withTimer} />
    );
  }

 {/* Return before generated ( quiz generator ) */}
  return (
    <div className='quizIaContainer'>
      <h2>Générateur de quiz</h2>

      <input
        placeholder='Entre ton thème ici...'
        value={inputData.theme}
        onChange={handleInputChange}
        name='theme'
        type='text'
      />

      <select id='choix' name='difficulty' onChange={handleInputChange}>
        <option value='Facile'>Facile</option>
        <option value='Moyen'>Moyen</option>
        <option value='Difficile'>Difficile</option>
      </select>

      <button className='createBtn' disabled={isCreateButtonDisabled} onClick={handleSubmit}>
        Générer mon quiz
      </button>
      <p>Les quiz sont générés par intelligence artificielle, certaines questions ou réponses peuvent contenir des erreurs.</p>
      
    </div>
  );
}
