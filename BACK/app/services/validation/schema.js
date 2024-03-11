import Joi from 'joi';

/**
 * @fileoverview This file contains the validation schema for editing user information.
 * @module validation/schema
 */

export const signupSchema = Joi.object({
  email: Joi.string().email().messages({ 'string.email': 'L\'email ne respecte pas le bon format' }),
  // 1 Letter Min / 1 Caps min / 1 Number min / 1 Special char [@$!%*?&] min / Min 8 length  :
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({ 'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé' }),
  // Valid check if password === validPassword
  confirmPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).valid(Joi.ref('password')).messages({ 'any.only': 'Confirmation de mot de passe différente' }),
  // Letters / Numbers / Min 3 Max 16 :
  nickname: Joi.string().pattern(/^[a-zA-Z0-9]{3,18}$/).messages({ 'string.pattern.base': 'Le pseudonyme ne respecte pas le format demandé' }),
}).required();

export const signinSchema = Joi.object({
  email: Joi.string().email().messages({ 'string.email': 'L\'email ne respecte pas le bon format' }),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({ 'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé' }),
}).required();

export const idSchema = Joi.object({
  id: Joi.string().pattern(/^[1-9][0-9]*$/).required().messages({ 'string.pattern.base': 'L\'identifiant ne respecte pas le format attendu' }),
});

export const idTop5Schema = Joi.object({
  // 1 to 9 or 10
  id: Joi.string().pattern(/^[1-5]$/).required().messages({ 'string.pattern.base': 'L\'identifiant ne respecte pas le format attendu' }),
});

export const editUserSchema = Joi.object({
  lastPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({ 'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé' }),
  newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({ 'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé' }),
  confirmNewPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).valid(Joi.ref('newPassword')).messages({ 'any.only': 'Confirmation de nouveau mot de passe différente' }),
  nickname: Joi.string().pattern(/^[a-zA-Z0-9]{3,18}$/).messages({ 'string.pattern.base': 'Le pseudonyme ne respecte pas le format demandé' }),
  profile_picture: Joi.string().messages({ _: 'Profile_picture ne respecte pas le format attendu' }),
});

export const scoreSchema = Joi.object({
  quiz_id: Joi.number().integer().positive().min(1)
    .messages({ _: 'L\'identifiant ne respecte pas le format attendu' }),
  score: Joi.number().integer().min(0)
    .messages({ _: 'Le score ne respecte pas le format attendu' }),
}).required();

export const editUserAdminSchema = Joi.object({
  email: Joi.string().email().messages({ 'string.email': 'L\'email ne respecte pas le bon format' }),
  // 1 Letter Min / 1 Caps min / 1 Number min / 1 Special char [@$!%*?&] min / Min 8 length  :
  nickname: Joi.string().pattern(/^[a-zA-Z0-9]{3,18}$/).messages({ 'string.pattern.base': 'Le pseudonyme ne respecte pas le format demandé' }),
  profile_picture: Joi.string().messages({ _: 'Profile_picture ne respecte pas le format attendu' }),
  role: Joi.string().valid('admin', 'member').messages({ _: 'Role invalide' }),
});

export const editQuizAdminSchema = Joi.object({
  theme: Joi.string().max(30).messages({ _: 'Format de theme invalide' }),
  difficulty: Joi.string().valid('Facile', 'Moyen', 'Difficile').messages({ _: 'Difficulté invalide' }),
  rate: Joi.number().integer().messages({ _: 'Note invalide' }),
  author_id: Joi.string().pattern(/^[1-9][0-9]*$/).messages({ _: 'L\'idetifiant dee l\'auteur ne respecte pas le bon format' }),
});

export const labelAdminSchema = Joi.object({
  label: Joi.string().messages({ _: 'Le label ne respecte pas le bon format' }),
});

export const quizIaSchema = Joi.object({
  theme: Joi.string().pattern(/^[a-zA-Z0-9\u00C0-\u00FF\s']*/).max(30).min(2)
    .required()
    .messages({ _: 'Format de theme invalide' }),
  difficulty: Joi.string().valid('Facile', 'Moyen', 'Difficile').messages({ _: 'Difficulté invalide' }),
});

export const saveQuizSchema = Joi.object({
  tempId: Joi.string().pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/).required().messages({ 'string.pattern.base': 'Format de tempId non valide' }),
});

export const rateSchema = Joi.object({
  operator: Joi.string().valid('+', '-').required().messages({ 'string.valid': 'Operateur invalide' }),
  quiz_id: Joi.number().integer().positive().min(1)
    .messages({ _: 'L\'identifiant ne respecte pas le format attendu' }),
}).required();
