import express from 'express';
import userController from '../controllers/user.js';

import { editUserSchema, signinSchema, signupSchema } from '../services/validation/schema.js';
import validate from '../services/validation/validate.js';
import { isMember } from '../services/auth/security.js';
import limiter from '../utils/rateLimiterUtils.js';

const router = express.Router();

router.get('/profile', isMember, userController.getUserById);
router.patch('/profile', limiter, isMember, validate(editUserSchema, 'body'), userController.editUserById);

router.get('/nickname', userController.getAllNicknames);

router.post('/signup', limiter, validate(signupSchema, 'body'), userController.createUser);
router.post('/signin', limiter, validate(signinSchema, 'body'), userController.connectUser);

export default router;

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * paths:
 *   /user/profile:
 *     get:
 *       summary: Get user profile
 *       tags:
 *         - User
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *     patch:
 *       summary: Edit user profile
 *       tags:
 *         - User
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: body
 *           required: true
 *           name: body
 *           description: User profile data
 *           schema:
 *             $ref: '#/definitions/editUserSchema'
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 *   /user/nickname:
 *     get:
 *       summary: Get all nicknames
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: Successful operation
 *   /user/signup:
 *     post:
 *       summary: Create a new user
 *       tags:
 *         - User
 *       parameters:
 *         - in: body
 *           name: body
 *           description: User credentials
 *           required: true
 *           schema:
 *             $ref: '#/definitions/signupSchema'
 *       responses:
 *         '201':
 *           description: User created
 *         '400':
 *           description: Bad request
 *         '422':
 *           description: Validation error
 *   /user/signin:
 *     post:
 *       summary: Authenticate user
 *       tags:
 *         - User
 *       parameters:
 *         - in: body
 *           name: body
 *           description: User credentials
 *           required: true
 *           schema:
 *             $ref: '#/definitions/signinSchema'
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '401':
 *           description: Unauthorized
 *         '422':
 *           description: Validation error
 * definitions:
 *   editUserSchema:
 *     type: object
 *     properties:
 *       lastPassword:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         description: Old password
 *       newPassword:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         description: New password
 *       confirmNewPassword:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         enum:
 *           - newPassword
 *         description: Confirm new password
 *       nickname:
 *         type: string
 *         pattern: ^[a-zA-Z0-9]{3,18}$
 *         description: Nickname
 *       profile_picture:
 *         type: string
 *         description: URL of profile picture
 *         example: profil_picture1.png
 *     examples:
*        lastPassword: "OldPassword123@"
*        newPassword: "NewPassword456@"
*        confirmNewPassword: "NewPassword456@"
*        nickname: "exampleUser123"
*        profile_picture: "profil_picture1.png"
 *   signupSchema:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *       password:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         description: User's password (must contain at least one lowercase letter, one uppercase letter, one digit, one special character [@ $!%*?&], and be at least 8 characters long)
 *       confirmPassword:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         enum:
 *          - password
 *         description: Confirmation of user's password (must match the password)
 *       nickname:
 *         type: string
 *         pattern: ^[a-zA-Z0-9]{3,18}$
 *         description: User's nickname (must contain only letters and numbers, and be between 3 and 18 characters long)
 *     example:
 *       email: example@example.com
 *       password: Password123@
 *       confirmPassword: Password123@
 *       nickname: UserExample123
 *   signinSchema:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *       password:
 *         type: string
 *         pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
 *         description: User's password
 */
