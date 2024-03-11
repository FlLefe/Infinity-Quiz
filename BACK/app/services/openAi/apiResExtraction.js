import APIError from '../error/APIError.js';

/**
 * Extracts the generated quiz from the response and converts it to JSON format.
 * @param {string} response - The response from the API call.
 * @returns {Object} - The extracted quiz in JSON format.
 * @throws {APIError} - If there is an error during the extraction process.
 */
export default function extractGenerationToJson(response) {
  try {
    const newQuiz = {};

    const quizGenerated = JSON.parse(response);

    if (Array.isArray(quizGenerated)) {
      const [theme, difficulty, language, questionsArray] = quizGenerated;
      newQuiz.theme = theme;
      newQuiz.difficulty = difficulty;
      newQuiz.language = language;
      newQuiz.questions = [];

      newQuiz.questions = questionsArray.map((question) => {
        const [questionText, goodAnswer, answer1, answer2, answer3] = question;
        return {
          label: questionText,
          answers: {
            good_answer: goodAnswer,
            answer_1: answer1,
            answer_2: answer2,
            answer_3: answer3,
          },
        };
      });
    } else {
      throw new Error('Erreur dans la génération du quiz', 500);
    }

    return newQuiz;
  } catch (error) {
    throw new APIError('Erreur lors de l\'extraction du quiz', 500);
  }
}
