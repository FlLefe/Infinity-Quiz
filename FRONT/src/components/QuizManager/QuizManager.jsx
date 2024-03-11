import { useState, useEffect } from "react";
import Question from "../Question/Question";
import Recap from "../Recap/Recap";
import './QuizManager.scss'


export default function QuizManager({ quizData, withTimer }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answersArray, setAnswersArray] = useState([]);

  useEffect(() => {
    if (quizData.questions && quizData.questions[currentQuestion]) {
      const initialOrder = ["good_answer", "answer_1", "answer_2", "answer_3"].sort(() => Math.random() -0.5);
      setAnswersArray(initialOrder);
    }
  }, [currentQuestion, quizData.questions]);

  useEffect(() => {
    if (withTimer && currentQuestion < quizData.questions.length) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setUserAnswers([...userAnswers, "Tu n'as pas répondu"]);
          setCurrentQuestion(currentQuestion + 1);
          setTimeLeft(10);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, withTimer, userAnswers, quizData.questions.length]);

  const handleAnswerClick = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(10);
  };

  return (
    <div className='quizManagerContainer'>
      {currentQuestion < quizData.questions.length ? (
        <>
          <Question
            question={quizData.questions[currentQuestion]}
            onAnswerClick={handleAnswerClick}
            buttonsOrder={answersArray}
            currentQuestion={currentQuestion}
          />
          {withTimer && <p className='timer'>{timeLeft} <img src='/icons/hourglass.svg' alt='Icone pour le timer'></img></p>}
        </>
      ) : (
        <Recap userAnswers={userAnswers} quiz={quizData} />
      )}
    </div>
  );
}
