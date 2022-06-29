import express from 'express';
import { RegisterRoutes } from './routes';
import swaggerDocs from './swagger.json';
import { ValidateError as TsoaValidationError } from 'tsoa';
import { ValidationError, CoreError, BusinessError } from '../../domain/core/error/errors';

import { Logger } from '../../../libs/logger';
import { Middlewares } from '../../../libs/rest/middlewares';
import { serverListener } from '../../../libs/rest/listener';

// Setting up env variables.
require('dotenv').config();

if (!process ||
  !process.env ||
  !process.env.PORT ||
  !process.env.APPLICATION_NAME ||
  !process.env.ENVIRONMENT_NAME ||
  !process.env.API_VERSION) throw new CoreError('Environment variables are not set. Please create a .env file at the root of this project.');

/**
 * Instantiating express to create the server for the application.
 */
const app = express();
const server = new serverListener(app);

// Configuring expected Errors for the middleware routes.
  const errorHandlerFactory = Middlewares.getErrorHandlerMiddlewareFactory();
  errorHandlerFactory.registerExpectedError(400, ValidationError);
  errorHandlerFactory.registerExpectedError(400, TsoaValidationError, (err: TsoaValidationError): ValidationError => {
    const fields = Object.keys(err.fields);
    return new ValidationError(fields);
  });
  errorHandlerFactory.registerExpectedError(422, BusinessError);
  errorHandlerFactory.registerExpectedError(500, CoreError);

// Registering express middlewares.
server.middlewares(Middlewares.getRequestResponseMiddlewares(swaggerDocs));

// Registering routes on TSOA for Swagger documentation.
RegisterRoutes(app);

server.middlewares([errorHandlerFactory.handler]);

// Initiates the server witht the env.
server.run(Number(process.env.PORT),
  process.env.APPLICATION_NAME,
  process.env.ENVIRONMENT_NAME,
  process.env.API_VERSION,
  Logger);