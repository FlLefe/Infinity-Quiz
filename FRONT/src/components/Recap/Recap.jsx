import { useContext, useEffect, useState } from "react";
import { quizRate, saveIaQuiz, saveScore, updateScore } from "../../services/QuizApi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./Recap.scss";
import { APIError } from "../../utils/ApiError";

export default function Recap({ userAnswers, quiz }) {
  const { isLoggedIn, userData, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [withIa, setWithIa] = useState(quiz.ia);
  const [showRate, setShowRate] = useState(true);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const isCorrect = (userAnswer, correctAnswer) => userAnswer === correctAnswer;

  const correctAnswersCount = userAnswers.reduce((count, userAnswer, index) => {
    const correctAnswer = quiz.questions[index].answers.good_answer;
    return isCorrect(userAnswer, correctAnswer) ? count + 1 : count;
  }, 0);

  async function handleSave(token, data) {
    setWithIa(false);
    try {
      const response = await saveIaQuiz(token, data);
      await saveScore(token, { quiz_id: response.quiz_id, score: correctAnswersCount });
      toast.success("Quiz enregistré avec succès !");
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de l'enregistrement du quiz");
      }
    }
  }

  async function handleRate(token, data) {
    setShowRate(false);
    try {
      await quizRate(token, { operator: data, quiz_id: quiz.quiz_id });
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de l'enregistrement de votre notation");
      }
    }
  }

  useEffect(() => {
    const saveOrUpdateQuizScore = async () => {
      if (quiz.score === null) {
        try {
          await saveScore(userData.token, { quiz_id: quiz.quiz_id, score: correctAnswersCount });
        } catch (error) {
          if (!APIError(error, handleLogout, navigate)) {
            toast.error("Erreur lors de l'enregistrement de votre score");
          }
        }
      } else if (quiz.score < correctAnswersCount) {
        try {
          await updateScore(userData.token, { quiz_id: quiz.quiz_id, score: correctAnswersCount });
        } catch (error) {
          if (!APIError(error, handleLogout, navigate)) {
            toast.error("Erreur lors de l'enregistrement de votre score");
          }
        }
      }
    };

    saveOrUpdateQuizScore();
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
      <div className="recapContainer">
          <div className="recapScore">
             {quiz.score && correctAnswersCount > quiz.score && <p>Bravo tu as amélioré ton score !</p>}
             <p>Ton score : {correctAnswersCount} / {quiz.questions.length}</p>
          </div>
        

        
        <div className="recapQuestionsContainer">
          <ul>
            {quiz.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const correctAnswer = question.answers.good_answer;
              const correct = isCorrect(userAnswer, correctAnswer);
              let answerClass = "";
              if (userAnswer === "Tu n'as pas répondu") {
                answerClass = "no-answer";
              } else if (correct) {
                answerClass = "correct";
              } else {
                answerClass = "incorrect";
              }

              return (
                <li key={index} className={answerClass} onClick={() => handleQuestionClick(index)}>
                  <h3>
                    {question.label}
                  </h3>
                  {selectedQuestionIndex === index && (
                    <>
                      <h4 className="goodAnswer">{correctAnswer}</h4>
                      <p>Votre réponse: {userAnswer}</p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="recapButtonsContainer">
          {/* <div className="recapOptions"> */}
          {withIa && (
            <button className="recapSaveButton" onClick={() => handleSave(userData.token, { tempId: quiz.tempId })}>
              <img src='/icons/save.svg' alt='Sauvegarder'></img>
            </button>
          )}
          {!quiz.ia && !quiz.score && showRate && isLoggedIn && (
            <button className="recapLikeButton" onClick={() => handleRate(userData.token, "+")}>
              <img src='/icons/thumbs-up.svg' alt="J'ai aimé"></img>
            </button>
          )}
          {!quiz.ia && !quiz.score && showRate && isLoggedIn && (
            <button className="recapDislikeButton" onClick={() => handleRate(userData.token, "-")}>
              <img src='/icons/thumbs-down.svg' alt="Je n'ai pas aimé"></img>
            </button>
          )}
          </div>
          <Link to={isLoggedIn ? "/quiz/all" : "/"} className="recapReturnButton">
            Retour
          </Link>
      </div>
  );
}
