import "./Question.scss";
export default function Question({ question, onAnswerClick, buttonsOrder, currentQuestion }) {
  return (
      <div className='questionContainer'>
        <p>Question {currentQuestion + 1} / 10</p>
        <h2>{question.label}</h2>
        <div className='answerOptionSection'>
          {buttonsOrder.map(
            (
              answerKey,
              index
            ) => (
              <button
                key={index}
                onClick={() => onAnswerClick(question.answers[answerKey])}
              >
                {question.answers[answerKey]}
              </button>
            )
          )}
        </div>
      </div>
  );
}
