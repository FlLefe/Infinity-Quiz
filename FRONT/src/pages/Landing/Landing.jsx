import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Landing.scss";
import { getAllGuestQuiz } from "../../services/QuizApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { TypeAnimation } from 'react-type-animation';

export default function Landing() {
  const { isLoggedIn } = useContext(AuthContext);

  const { data, loading, error } = useFetch(getAllGuestQuiz);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des quiz.</p>;
  }


  return (
      <div className="landingContainer">
          <img className="landingLogo" src="/Logo-Blanc-Plein.png" alt="Logo du site blanc" />

          <div className="landingGenerate">
            <h1>Générez des quiz via l'intelligence artificielle. La seule limite ? <br/> Votre imagination !</h1>
            <div className="landingInputGenerate">
              <input type="text" placeholder="Saisissez un thème"/>
              <Link className="landingGenerateButton" to={"/quiz/generate"}>Générer</Link>
            </div>
              <div className="animatedText">
                <p>En manque d'inspiration ?</p>
                <TypeAnimation
                    sequence={[
                      'Les films d\'actions en 1999',
                      3000,
                      'Les plus belles plages de France',
                      3000,
                      'Les plus beaux monuments du monde',
                      3000,
                      'Les expressions idiomatiques',
                      3000,
                      'Les plus grandes inventions',
                      3000,
                      () => {
                        console.log('Sequence completed');
                      },
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ display: 'block' }}
                  />
              </div>
            
          </div>
          
            <div className="top5Container">
              <img className="top5" src="/top5.png" alt="Icone de podium top 5" />
              <h2>TOP 5 DES QUIZ</h2>
              <img className="top5" src="/top5.png" alt="Icone de podium top 5" />
            </div>
            
          <div className="landingList">
            <ul>
          {data ? (
            data.map((quiz, index) => (
              <li key={quiz.quiz_id}>
                <Link to={`/quiz/top/${index + 1}`}>
                    <h3>{quiz.theme}</h3>
                    <p>{quiz.difficulty}</p>
                    <p>{quiz.rate} <img src='/icons/heart.svg' alt='Icone coeur'></img></p>
                    <div className='landingAuthorContainer'>
                      <p> {quiz.author_nickname}</p>
                      <img src={`/profil/${quiz.author_profile_picture}`} alt='Image de profil' />
                    </div>
                </Link>
              </li>
            ))
          ) : (
            <p>Aucun quiz disponible.</p>
          )}
        </ul>
          </div>

      </div>
  );
}
