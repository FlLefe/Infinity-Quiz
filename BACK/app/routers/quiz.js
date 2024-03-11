import express from 'express';
import quizController from '../controllers/quiz.js';

import {
  scoreSchema, idSchema, quizIaSchema, rateSchema, idTop5Schema, saveQuizSchema,
} from '../services/validation/schema.js';
import validate from '../services/validation/validate.js';
import { isMember } from '../services/auth/security.js';
import limiter from '../utils/rateLimiterUtils.js';

const router = express.Router();

router.get('/top', quizController.getTopQuiz);
router.get('/top/:id', validate(idTop5Schema, 'params'), quizController.getTopQuizById);

router.get('/all', isMember, quizController.getAllQuizWithData);
router.get('/:id', isMember, validate(idSchema, 'params'), quizController.getQuizById);

router.post('/score', isMember, validate(scoreSchema, 'body'), quizController.createScoreOnUserQuiz);
router.get('/score/all', isMember, quizController.getAllUserScores);
router.patch('/score/edit', isMember, validate(scoreSchema, 'body'), quizController.editUserScoreOnQuiz);

router.post('/generate', limiter, isMember, validate(quizIaSchema, 'body'), quizController.generateQuiz);
router.post('/save', limiter, isMember, validate(saveQuizSchema, 'body'), quizController.saveQuiz);

router.patch('/rate', limiter, isMember, validate(rateSchema, 'body'), quizController.editRateOfAQuiz);

export default router;

/**
 * @swagger
 *
 * tags:
 *   - name: Quiz
 *     description: Operations related to quizzes
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * paths:
 *   /quiz/top:
 *     get:
 *       summary: Get top 5 quizzes
 *       tags:
 *         - Quiz
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /quiz/top/{id}:
 *     get:
 *       summary: Get top quiz by ID
 *       tags:
 *         - Quiz
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the top quiz
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '422':
 *           description: Validation error
 *
 *   /quiz/all:
 *     get:
 *       summary: Get all quizzes
 *       tags:
 *         - Quiz
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /quiz/{id}:
 *     get:
 *       summary: Get quiz by ID
 *       tags:
 *         - Quiz
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the quiz
 *           required: true
 *           type: number
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /quiz/score:
 *     post:
 *       summary: Create score for a quiz
 *       tags:
 *         - Quiz
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Score data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/scoreSchema'
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *   /quiz/score/all:
 *     get:
 *       summary: Get all user scores
 *       tags:
 *         - Quiz
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /quiz/score/edit:
 *     patch:
 *       summary: Edit user score for a quiz
 *       tags:
 *         - Quiz
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Score data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/scoreSchema'
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *   /quiz/generate:
 *     post:
 *       summary: Generate a quiz
 *       tags:
 *         - Quiz
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Quiz data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/quizIaSchema'
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *         '423':
 *           description: Locked
 *
 *
 *   /quiz/save:
 *     post:
 *       summary: Save a quiz
 *       tags:
 *         - Quiz
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Quiz data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/saveQuizSchema'
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '404':
 *          description: Not found
 *         '422':
 *           description: Validation error
 *
 *   /quiz/rate:
 *     patch:
 *       summary: Rate a quiz
 *       tags:
 *         - Quiz
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Rate data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/rateSchema'
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 * definitions:
 *   scoreSchema:
 *     type: object
 *     required:
 *       - quiz_id
 *       - score
 *     properties:
 *       quiz_id:
 *         type: number
 *         integer: true
 *         minimum: 1
 *         description: ID of the quiz
 *       score:
 *         type: number
 *         integer: true
 *         minimum: 0
 *         description: Score for the quiz
 *   quizIaSchema:
 *     type: object
 *     required:
 *       - theme
 *     properties:
 *       theme:
 *         type: string
 *         maxLength: 40
 *         minLength: 2
 *         pattern: ^[a-zA-Z0-9\u00C0-\u00FF\s']+$
 *         description: Theme of the quiz
 *         example: Les bronzés font du ski
 *       difficulty:
 *         type: string
 *         description: Difficulty level of the quiz
 *         example: Facile
 *   saveQuizSchema:
 *     type: object
 *     required:
 *      - tempId
 *     properties:
 *       tempId:
 *         type: string
 *         pattern: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
 *         description: Temporary ID of the quiz
 *         example: f47ac10b-58cc-4372-a567-0e02b2c3d479
 *   rateSchema:
 *     type: object
 *     required:
 *       - operator
 *       - quiz_id
 *     properties:
 *       operator:
 *         type: string
 *         valid: ['+', '-']
 *         description: Operator (+ or -)
 *         example: +
 *       quiz_id:
 *         type: number
 *         integer: true
 *         minimum: 1
 *         description: ID of the quiz
 */
