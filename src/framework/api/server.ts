import express from 'express';
import { RegisterRoutes } from './routes';
import swaggerDocs from './swagger.json';
import { ValidateError as TsoaValidationError } from 'tsoa';
import { ValidationError, CoreError, BusinessError } from '../../domain/core/error/errors';

import { Logger } from '../../../libs/logger';
import { Middlewares } from '../../../libs/rest/middlewares';
import { serverListener } from '../../../libs/rest/listener';

// Configurando variáveis de ambiente.
require('dotenv').config();

if (!process ||
  !process.env ||
  !process.env.PORT ||
  !process.env.APPLICATION_NAME ||
  !process.env.ENVIRONMENT_NAME ||
  !process.env.API_VERSION) throw new CoreError('Variável de ambiente não inicializada.');

/**
 * Instanciando express e listener para iniciar aplicação.
 */
const app = express();
const server = new serverListener(app);

// Configura os erros esperados para o middleware.
  const errorHandlerFactory = Middlewares.getErrorHandlerMiddlewareFactory();
  errorHandlerFactory.registerExpectedError(400, ValidationError);
  errorHandlerFactory.registerExpectedError(400, TsoaValidationError, (err: TsoaValidationError): ValidationError => {
    const fields = Object.keys(err.fields);
    return new ValidationError(fields);
  });
  errorHandlerFactory.registerExpectedError(422, BusinessError);
  errorHandlerFactory.registerExpectedError(500, CoreError);


// Registra middlewares no Express.
server.middlewares(Middlewares.getRequestResponseMiddlewares(swaggerDocs));

//  Registra rotas no TSOA para a geração do Swagger.
RegisterRoutes(app);

server.middlewares([errorHandlerFactory.handler]);



// Inicializa o servidor com as variáveis de ambiente.
server.run(Number(process.env.PORT),
  process.env.APPLICATION_NAME,
  process.env.ENVIRONMENT_NAME,
  process.env.API_VERSION,
  Logger);