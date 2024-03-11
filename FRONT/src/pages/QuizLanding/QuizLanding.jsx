import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getGuestQuizById } from "../../services/QuizApi";
import { Link, useParams } from "react-router-dom";
import QuizManager from "../../components/QuizManager/QuizManager";

export default function QuizLanding() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [withTimer, setWithTimer] = useState(false);

  const { data, loading, error } = useFetch(getGuestQuizById, id);

  if (loading) {
    return <p>Chargement du quiz...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement du quiz...</p>;
  }

  {/* Click Function to launch quiz with or without timer */}
  const handleStartQuiz = (withTimer) => {
    setQuizStarted(true);
    setWithTimer(withTimer);
  };

  {/* Return before launch quiz, details about the quiz */}
  if (!quizStarted) {
    return (
      <div className='quizDbContainer'>
            <div className='quizDbDetails'>
              <h2> {data.theme}</h2>
              <p> {data.difficulty}</p>
              <p> {data.rate} <img src='/icons/heart.svg' alt='Icone coeur'></img></p>
              <p> Quiz généré par :</p>
              <p> {data.author_nickname}</p>
              <img className='quizDbPicture' src={`/profil/${data.author_profile_picture}`} alt='Image de profil' />
            </div>
            <div className='quizDbButtons'>
              <button onClick={() => handleStartQuiz(false)}>
                Lancer le quiz sans timer
                <img src='/icons/coffee.svg' alt='Icone timer'></img>
              </button>
              <button onClick={() => handleStartQuiz(true)}>
                Lancer le quiz avec timer
                <img src='/icons/clock.svg' alt='Icone timer'></img>
              </button>
            </div>
            <Link to={"/"} className='startBtn'>
              Retourner à la liste des quiz
            </Link>
          </div>
    );
  }
  {/* Return when quiz launched, return the component QuizManager */}
  if (quizStarted) {
  return <QuizManager quizData={data} withTimer={withTimer} />;
  }
}
