/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerMiddleware = express.Router();

/**
 * Configuration object for Swagger documentation.
 * @typedef {Object} SwaggerOptions
 * @property {Object} swaggerDefinition - The definition of the Swagger document.
 * @property {Object} swaggerDefinition.info - Information about the API.
 * @property {string} swaggerDefinition.info.title - The title of the API.
 * @property {string} swaggerDefinition.info.version - The version of the API.
 * @property {string} swaggerDefinition.basePath - The base path of the API.
 * @property {Object} swaggerDefinition.securityDefinitions - The security definitions for the API.
 * @property {Object} swaggerDefinition.securityDefinitions.bearerAuth - The definition for bearer authentication.
 * @property {string} swaggerDefinition.securityDefinitions.bearerAuth.type - The type of authentication.
 * @property {string} swaggerDefinition.securityDefinitions.bearerAuth.name - The name of the authorization header.
 * @property {string} swaggerDefinition.securityDefinitions.bearerAuth.in - The location of the authorization header.
 * @property {string} swaggerDefinition.securityDefinitions.bearerAuth.description - The description of the authorization header format.
 * @property {string[]} apis - The paths to the API route files.
 */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API des utilisateurs',
      version: '1.0.0',
    },
    basePath: '/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Format du jeton : Bearer <token>',
      },
    },
  },
  apis: ['./app/routers/*.js'],

};

/**
 * Generates Swagger documentation for the API.
 *
 * @returns {object} The Swagger documentation object.
 */
const swaggerDocs = swaggerJsDoc(swaggerOptions);

swaggerMiddleware.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerMiddleware;
