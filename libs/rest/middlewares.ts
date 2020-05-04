import * as RequestResponse from './restOperations'
import { ERROR_HANDLER_FACTORY, ErrorHandlerFactory } from './errorHandler';

class MiddlewaresRegistry {

  public getRequestResponseMiddlewares(swaggerDoc: any): any[] {
    return [
      RequestResponse.handleCors,
      RequestResponse.handleBodyRequestParsing,
      RequestResponse.handleCompression,
      RequestResponse.createApiDocsHandler(swaggerDoc),
      RequestResponse.logRequest,
    ];
  }

  public getErrorHandlerMiddlewareFactory(): ErrorHandlerFactory {
    return ERROR_HANDLER_FACTORY;
  }
}

export const Middlewares = new MiddlewaresRegistry();
