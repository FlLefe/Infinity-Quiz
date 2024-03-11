import { Link } from "react-router-dom";
import './List.scss'

export default function List ({ quizList }) {

  return (
    <div className="listQuizContainer">
      <ul>
      {quizList ? (
          quizList.map((quiz) => (
            <li key={quiz.quiz_id}>
              <Link to={`/quiz/${quiz.quiz_id}`}>
                  <h3>{quiz.theme}</h3>
                  <p>{quiz.difficulty}</p>
                  <p>{quiz.rate} <img src='/icons/heart.svg' alt='Icone coeur'></img></p>
                  <div className="listQuizAuthorContainer">
                  <p> {quiz.author_nickname}</p>
                  <img className="ListPicture" src={`/profil/${quiz.author_profile_picture}`} alt="Image de profil" />
                  </div>
                  <p>{quiz.score !== null && quiz.score !== undefined ? `Ton score : ${quiz.score} / 10` : ""}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>Aucun quiz disponible.</p>
        )}
      </ul>
    </div>
  );
}
