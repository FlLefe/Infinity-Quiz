/**
 * Module containing functions to interact with the database regarding quizzes.
 * @module quizDatamapper
 */

import handleRequest from '../utils/pgUtils.js';

const { executeRequest, executeRequestWithSingleResult } = handleRequest;

export default {

  /**
   * Retrieve all quizzes from the database.
   * @async
   * @function findAll
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM get_all_quiz();';
    return executeRequest(sqlQuery);
  },

  /**
 * Retrieve top 10 quizzes with questions and authors only.
 * @async
 * @function findTopTenQuiz
 * @returns {Promise} - A promise that resolves with the retrieved quizzes.
 */
  async findTopFiveQuiz() {
    const sqlQuery = 'SELECT * FROM get_top_5_quiz_with_data();';
    return executeRequest(sqlQuery);
  },

  /**
 * Retrieve one of top 10 quiz with questions and authors only.
 * @async
 * @function findQuizByIdSortByRate
 * @returns {Promise} - A promise that resolves with the retrieved quizzes.
 */
  async findQuizByIdSortByRate(top) {
    const sqlQuery = 'SELECT * FROM get_one_of_top_5_quiz_with_data($1);';
    const values = [top];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Create a new quiz in the database.
   * @async
   * @function createQuiz
   * @param {Object} quiz - Quiz object containing the quiz informations to create.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async createQuiz(quiz) {
    const sqlQuery = 'SELECT * FROM insert_quiz($1);';
    const values = [quiz];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Create new question in the database.
   * @async
   * @function createQuestion
   * @param {Array} question - Question array containing the question informations to create.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async createQuestion(question) {
    const sqlQuery = 'SELECT * FROM insert_questions($1);';
    const values = [question];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
 * Retrieve all quizzes with questions, authors, and scores for a specific user.
 * @async
 * @function findAllQuizAuthorScores
 * @param {number} id - The ID of the user.
 * @returns {Promise} - A promise that resolves with the retrieved quizzes.
 */
  async findAllQuizAuthorScores(id) {
    const sqlQuery = 'SELECT * FROM get_all_quiz_with_data_and_scores($1);';
    const values = [id];
    return executeRequest(sqlQuery, values);
  },

  /**
   * Find questions and quiz by quiz ID and user ID if connected in the database.
   * @async
   * @function findQuizWithQuestionsAndAuthorByQuizIdUserId
   * @param {number} id - ID of the quiz to find questions for.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findQuizWithQuestionsAndAuthorByQuizIdUserId(quizId, userId) {
    const sqlQuery = 'SELECT * FROM get_quiz_with_data_by_user($1,$2);';
    const values = [quizId, userId];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Find questions and quiz by quiz ID in the database.
   * @async
   * @function findQuizWithQuestionsAndAuthorByQuizId
   * @param {number} id - ID of the quiz to find questions for.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findQuizWithQuestionsAndAuthorByQuizId(id) {
    const sqlQuery = 'SELECT * FROM get_quiz_with_data($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Find a quiz by its ID in the database.
   * @async
   * @function findById
   * @param {number} id - ID of the quiz to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM get_quiz($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
 * Create a score in the database.
 * @async
 * @function createScore
 * @param {Object} data - Data object containing user_id, quiz_id, and score.
 * @returns {Promise} Promise object representing the result of the database query.
 */
  async createScore(data) {
    const sqlQuery = 'SELECT * FROM insert_score($1);';
    const values = [data];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
 * Find all scores for a specific user in the database.
 * @async
 * @function findAllUserScores
 * @param {number} id - ID of the user.
 * @returns {Promise} Promise object representing the result of the database query.
 */
  async findAllUserScores(id) {
    const sqlQuery = 'SELECT * FROM get_user_all_scores($1);';
    const values = [id];
    return executeRequest(sqlQuery, values);
  },

  /**
 * Find a specific score for a user in the database.
 * @async
 * @function findOneUserScore
 * @param {Object} data - Data object containing user_id and quiz_id.
 * @returns {Promise} Promise object representing the result of the database query.
 */
  async findOneUserScore(data) {
    const sqlQuery = 'SELECT * FROM get_user_score($1);';
    const values = [data];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Update a user in the database.
   * @async
   * @function updateScore
   * @param {Object} score - Score object containing the updated score data (id, score, user_id, quiz_id).
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async updateScore(score) {
    const sqlQuery = 'SELECT * FROM update_score($1);';
    const values = [score];
    return executeRequest(sqlQuery, values);
  },

  /**
   * Update a user in the database.
   * @async
   * @function updateRate
   * @param {Object} score - Score object containing the updated score data (id, score, user_id, quiz_id).
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async updateRate(operator, quizId) {
    const sqlQuery = 'SELECT * FROM update_rate($1,$2);';
    const values = [operator, quizId];
    return executeRequest(sqlQuery, values);
  },

};
