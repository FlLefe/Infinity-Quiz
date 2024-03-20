/* eslint-disable consistent-return */
/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import quizDatamapper from '../datamappers/quiz.js';
import banwordDatamapper from '../datamappers/banword.js';
import userDatamapper from '../datamappers/user.js';
import statisticDatamapper from '../datamappers/statistic.js';
import manageResponse from '../utils/controllerUtils.js';
import APIError from '../services/error/APIError.js';
import requestApi from '../services/openAi/apiRequest.js';
import { getCache, setCache } from '../utils/cacheUtils.js';

export default {

  /**
   * Retrieve all quiz from database
   * @async
   * @function getAllQuiz
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllQuiz(req, res, next) {
    const { result, error } = await quizDatamapper.findAll();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve top 10 quiz with data.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
  async getTopQuiz(req, res, next) {
    const { result, error } = await quizDatamapper.findTopFiveQuiz();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve one of top 10 quiz with data.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
  async getTopQuizById(req, res, next) {
    const { result, error } = await quizDatamapper.findQuizByIdSortByRate(req.params.id);
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve all quizzes with data.
 * If user is connected, retrieves quizzes with scores.
 * If user is not connected, retrieves quizzes with authors only.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
  async getAllQuizWithData(req, res, next) {
    if (!req.user?.id) return next(new APIError('Utilisateur non connecté à la création du score', 401));

    // If user connected :
    const { result, error } = await quizDatamapper.findAllQuizAuthorScores(req.user.id);
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve a quiz by its ID and its associated questions connected or not
 * @async
 * @function getQuizById
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
  async getQuizById(req, res, next) {
    const { id: quizId } = req.params;
    if (!req.user?.id) return next(new APIError('Utilisateur non connecté à la création du score', 401));

    // If user connected
    const { result, error } = await quizDatamapper.findQuizWithQuestionsAndAuthorByQuizIdUserId(quizId, req.user.id);
    manageResponse(res, result, error, next);
  },

  /**
 * Create a score for a quiz belonging to a user in the database if connected
 * @async
 * @function createScoreOnUserQuiz
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
  async createScoreOnUserQuiz(req, res, next) {
    const { quiz_id, score } = req.body;
    const user_id = req.user?.id;

    if (!user_id) return next(new APIError('Utilisateur non connecté à la création du score', 401));

    const data = { user_id, quiz_id, score };
    const { result, error } = await quizDatamapper.createScore(data);

    manageResponse(res, result, error, next);
  },

  /**
 * Get all scores for a specific user from the database.
 * @async
 * @function getAllUserScores
 * @param {Object} req - HTTP Request object.
 * @param {Object} res - HTTP Response object.
 * @param {Function} next - Next middleware function.
 */
  async getAllUserScores(req, res, next) {
    if (req.user?.id) {
      const { result, error } = await quizDatamapper.findAllUserScores(req.user.id);
      manageResponse(res, result, error, next);
    } else {
      next(new APIError('Utilisateur non connecté pour accéder aux scores', 401));
    }
  },

  /**
 * Edit the score of a quiz for a specific user in the database.
 * If the score does not exist it will return an error
 * @async
 * @function editUserScoreOnQuiz
 * @param {Object} req - HTTP Request object.
 * @param {Object} res - HTTP Response object.
 * @param {Function} next - Next middleware function.
 */
  async editUserScoreOnQuiz(req, res, next) {
    const { quiz_id, score } = req.body;
    const user_id = req.user?.id;

    if (!user_id) return next(new APIError('Utilisateur non connecté à la modification du score', 401));

    const data = { user_id, quiz_id, score };
    // Find if score on quiz of the user already exists
    const { result: findByIdResult, error: findByIdError } = await quizDatamapper.findOneUserScore(data);
    if (findByIdError) return next(findByIdError);

    const userScore = { ...findByIdResult, ...req.body };
    const { result: updateResult, error: updateError } = await quizDatamapper.updateScore(userScore);

    manageResponse(res, updateResult, updateError, next);
  },

  /**
 * Generates a quiz based on the provided parameters.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to pass control to the next middleware.
 * @returns {Object} - The JSON response object containing the generated quiz.
 */
  async generateQuiz(req, res, next) {
    try {
      const user_id = req.user?.id;

      if (!user_id) return next(new APIError('Utilisateur non connecté pour accéder au générateur de quiz', 401));
      const { result: findUserResult, error: findUserError } = await userDatamapper.findById(user_id);

      if (findUserError) return next(new APIError('Utilisateur non trouvé', 400));
      if (findUserResult.prompt === 0) return next(new APIError('Vous avez épuisé vos crédits', 423));

      const { promptDecountError } = await userDatamapper.decountPromptToken(user_id);
      if (promptDecountError) return next(new APIError('Erreur dans le décompte des crédits', 400));

      // Default parameters for the quiz
      const defaultParams = {
        nbQuestions: 10,
        nbOptions: 4,
        theme: '',
        difficulty: 'Moyen',
        language: 'Fr',
      };

      let banwords = getCache('allBanwords');

      if (!banwords) {
        const { result, error } = await banwordDatamapper.findAllWithoutId();
        if (error) return next(error);

        // Cache the banwords with no expiration
        setCache('allBanwords', result, -1);
        banwords = result;
      }

      /**
   * Verify if the theme contains any inappropriate terms.
   * @param {string} theme - The theme to verify.
   * @param {Object[]} banwords - The list of banwords.
   * @returns {Promise<boolean>} - A Promise that resolves to true if any banword is found, otherwise false.
   */
      const verifyBanword = async (theme, banwordsObj) => {
      // Convert the theme to lowercase to avoid case sensitivity issues
        const themeLower = theme.toLowerCase();
        // Check if any banword is found in the theme
        return banwordsObj.some((banwordObj) => {
          const banword = banwordObj.label;
          // Use a regular expression to find the exact banword
          const pattern = new RegExp(`\\b${banword}\\b`, 'i');
          return pattern.test(themeLower);
        });
      };

      const containsBanword = await verifyBanword(req.body.theme, banwords);
      if (containsBanword) return next(new APIError('Le thème contient des termes inappropriés', 403));

      // Validate request parameters and retrieve formatted quiz and statistics
      const validatedParams = { ...defaultParams, ...req.body };
      const { quizFormated, stats: quizStats, error: requestApiError } = await requestApi(validatedParams);
      if (requestApiError) return next(new APIError(requestApiError));

      // Add user ID to the statistics
      const stats = { ...quizStats, user_id };

      // Create statistics in the database
      const { error } = await statisticDatamapper.create(stats);
      if (error) return next(error);

      // Customize quiz details before sending the response
      quizFormated.author_nickname = req.user.nickname;
      quizFormated.author_profile_picture = req.user.profile_picture;
      quizFormated.rate = 0;

      // Generate unique ID to save it in cache and get it later if user validates Exp : 20mn
      const randomId = uuidv4();
      setCache(randomId, quizFormated, 1200);
      quizFormated.tempId = randomId;

      // Return the generated quiz as a JSON response
      return res.json(quizFormated);
    } catch (error) {
      return next(new APIError('Erreur lors de la génération du quiz', 500));
    }
  },

  async saveQuiz(req, res, next) {
    const { tempId } = req.body;
    const newQuiz = getCache(tempId);
    if (!newQuiz) return next(new APIError('Echec de la récupération du quiz / délai dépassé', 404));

    const quizData = {
      theme: newQuiz.theme,
      difficulty: newQuiz.difficulty,
      rate: newQuiz.rate,
      author_id: req.user.id,
    };

    const { result: createResult, error: createError } = await quizDatamapper.createQuiz(quizData);

    if (createError) return next(createError);

    const quiz_id = parseInt(createResult.id, 10);

    const quizQuestions = newQuiz.questions.map((question) => ({
      label: question.label,
      good_answer: question.answers.good_answer,
      answer_1: question.answers.answer_1,
      answer_2: question.answers.answer_2,
      answer_3: question.answers.answer_3,
      quiz_id,
    }));

    const { error } = await quizDatamapper.createQuestion(quizQuestions);
    if (error) return next(new APIError('Insertion des questions en BDD non aboutie'));

    return res.json({ message: 'Quiz sauvegardé avec succès', quiz_id });
  },

  async editRateOfAQuiz(req, res, next) {
    if (!req.user?.id) return next(new APIError('Utilisateur non connecté', 401));

    const { operator, quiz_id } = req.body;

    if (operator === '+' || operator === '-') {
      const { result, error } = await quizDatamapper.updateRate(operator, quiz_id);
      return manageResponse(res, result, error, next);
    }
    return next(new APIError('Mise a jour du rate échouée', 400));
  },

};
