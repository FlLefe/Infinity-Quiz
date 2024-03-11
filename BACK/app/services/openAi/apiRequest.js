import OpenAI from 'openai';
import responseStats from './apiStats.js';
import extractGenerationToJson from './apiResExtraction.js';
import APIError from '../error/APIError.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

/**
 * Requests the OpenAI API to generate a quiz based on the provided parameters.
 * @param {Object} params - The parameters for generating the quiz.
 * @param {number} params.nbQuestions - The number of questions in the quiz.
 * @param {number} params.nbOptions - The number of options per question.
 * @param {string} params.theme - The theme of the quiz.
 * @param {string} params.difficulty - The difficulty level of the quiz.
 * @param {string} params.language - The language of the quiz.
 * @returns {Promise<Object>} - The formatted quiz and statistics.
 * @throws {APIError} - If there is an error during the quiz generation.
 */
export default async function requestApi(params) {
  try {
    const resFormat = '["theme","difficulty","language",[["question","rep1","rep2","rep3","rep4"],]]';

    const prompt = `Génère un quiz de ${params.nbQuestions} questions.${params.nbOptions} rep par quest.Theme:${params.theme}.Corrige les fautes d'orthographe du theme si il y en a.Difficulté:${params.difficulty}.Lang:${params.language}.Max 100 caractères par entité question/réponse.La bonne réponse sera toujours rep1.Pas de réponse ou de question identique. Pas d'actualité.Format de réponse:${resFormat}.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Tu es rédacteur de quiz expérimenté et tu crées des questions variées et recherchées.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo-1106',
      max_tokens: 1000,
      temperature: 0,
    });
    console.log(JSON.stringify(completion.choices[0].message.content, null, 2));
    console.log(completion.usage);
    const quizFormated = await extractGenerationToJson(completion.choices[0].message.content);
    console.log(JSON.stringify(quizFormated, null, 2));
    if (completion.choices[0].message.content.length < 400) throw new APIError('Erreur lors de la génération du quiz', 500);

    const stats = await responseStats(completion.usage);
    console.log(stats);
    return { quizFormated, stats };
  } catch (error) {
    return new APIError('Erreur lors de la génération du quiz', 500);
  }
}
