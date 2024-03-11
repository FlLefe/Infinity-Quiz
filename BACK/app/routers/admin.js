import express from 'express';
import adminController from '../controllers/admin.js';

import {
  idSchema, editUserAdminSchema, editQuizAdminSchema, labelAdminSchema,
} from '../services/validation/schema.js';
import validate from '../services/validation/validate.js';

const router = express.Router();

router.get('/user/all', adminController.getAllUsers);
router.get('/user/:id', validate(idSchema, 'params'), adminController.getOneUser);
router.patch('/user/:id', validate(editUserAdminSchema, 'body'), adminController.editUserById);
router.delete('/user/:id', validate(idSchema, 'params'), adminController.deleteUserById);

router.get('/quiz/all', adminController.getAllQuiz);
router.get('/quiz/:id', validate(idSchema, 'params'), adminController.getOneQuiz);
router.patch('/quiz/:id', validate(editQuizAdminSchema, 'body'), adminController.editQuizById);
router.delete('/quiz/:id', validate(idSchema, 'params'), adminController.deleteQuizById);

router.get('/banword/all', adminController.getAllBanwords);
router.get('/banword/:id', validate(idSchema, 'params'), adminController.getOneBanword);
router.post('/banword', validate(labelAdminSchema, 'body'), adminController.createBanword);
router.patch('/banword/:id', validate(labelAdminSchema, 'body'), adminController.editBanwordById);
router.delete('/banword/:id', validate(idSchema, 'params'), adminController.deleteBanwordById);

router.get('/statistic', adminController.getAllStats);
router.get('/statistic/:id', validate(idSchema, 'params'), adminController.getStatsByUserId);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Admin/User
 *     description: Operations related to user management
 *   - name: Admin/Quiz
 *     description: Operations related to quiz management
 *   - name: Admin/Banword
 *     description: Operations related to banned word management
 *   - name: Admin/Statistic
 *     description: Operations related to statistics
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header

 * paths:
 *   /admin/user/all:
 *     get:
 *       summary: Get all users
 *       tags:
 *         - Admin/User
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /admin/user/{id}:
 *     get:
 *       summary: Get user by ID
 *       tags:
 *         - Admin/User
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     patch:
 *       summary: Edit user by ID
 *       tags:
 *         - Admin/User
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *         - in: body
 *           name: body
 *           description: User data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/editUserAdminSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     delete:
 *       summary: Delete user by ID
 *       tags:
 *         - Admin/User
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *   /admin/quiz/all:
 *     get:
 *       summary: Get all quizzes
 *       tags:
 *         - Admin/Quiz
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /admin/quiz/{id}:
 *     get:
 *       summary: Get quiz by ID
 *       tags:
 *         - Admin/Quiz
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     patch:
 *       summary: Edit quiz by ID
 *       tags:
 *         - Admin/Quiz
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *         - in: body
 *           name: body
 *           description: Quiz data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/editQuizAdminSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     delete:
 *       summary: Delete quiz by ID
 *       tags:
 *         - Admin/Quiz
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *   /admin/banword/all:
 *     get:
 *       summary: Get all banwords
 *       tags:
 *         - Admin/Banword
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /admin/banword/{id}:
 *     get:
 *       summary: Get banword by ID
 *       tags:
 *         - Admin/Banword
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     patch:
 *       summary: Edit banword by ID
 *       tags:
 *         - Admin/Banword
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *         - in: body
 *           name: body
 *           description: Banword data
 *           required: true
 *           schema:
 *             $ref: '#/definitions/labelAdminSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *     delete:
 *       summary: Delete banword by ID
 *       tags:
 *         - Admin/Banword
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 *   /admin/statistic:
 *     get:
 *       summary: Get all statistics
 *       tags:
 *         - Admin/Statistic
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *
 *   /admin/statistic/{id}:
 *     get:
 *       summary: Get statistics by user ID
 *       tags:
 *         - Admin/Statistic
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             $ref: '#/definitions/idSchema'
 *       security:
 *         - bearerAuth: []
 *         - role: [admin]
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *
 * definitions:
 *   idSchema:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         pattern: ^[1-9][0-9]*$
 *         description: ID of the entity
 *
 *   labelAdminSchema:
 *     type: object
 *     properties:
 *       label:
 *         type: string
 *         description: Label of the banword
 *
 *   editUserAdminSchema:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *       nickname:
 *         type: string
 *         pattern: ^[a-zA-Z0-9]{3,18}$
 *         description: User's nickname
 *       profile_picture:
 *         type: string
 *         description: URL of profile picture
 *       role:
 *         type: string
 *         enum:
 *           - admin
 *           - member
 *         description: Role of the user
 *     example:
 *       email: example@example.com
 *       nickname: UserExample123
 *       profile_picture: "profil_picture1.png"
 *       role: member
 *   editQuizAdminSchema:
 *     type: object
 *     properties:
 *       theme:
 *         type: string
 *         maxLength: 40
 *         description: Theme of the quiz
 *       difficulty:
 *         type: string
 *         enum:
 *           - Easy
 *           - Medium
 *           - Advanced
 *           - Expert
 *           - Extreme
 *         description: Difficulty level of the quiz
 *       rate:
 *         type: integer
 *         description: Rating of the quiz
 *       author_id:
 *         type: string
 *         pattern: "^[1-9][0-9]*$"
 *         description: Identifier of the quiz author
 *     required:
 *       - theme
 *       - difficulty
 *       - rate
 *       - author_id
 *     example:
 *       theme: "History"
 *       difficulty: "Facile"
 *       rate: 4
 *       author_id: "3"
 */
