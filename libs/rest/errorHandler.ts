import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from '../logger';

class ExpectedErrorInfo {

  httpStatusCode: number;
  errorType: any;
  transform: (err: any) => any;

  constructor (httpStatusCode: string | number, errorType: any, transformer: (err: any) => any) {
    this.httpStatusCode = Number(httpStatusCode);
    this.errorType = errorType;
    this.transform = transformer;
  }
}

/**
 * Knows how to create an Express error handler instance
 */
export class ErrorHandlerFactory {

  expectedErrors: ExpectedErrorInfo[] = [];
  handler: any;

  registerExpectedError(httpStatusCode: string | number, errorType: any, transformer?: (err: any) => any) {
    this.expectedErrors.push(new ExpectedErrorInfo(
      httpStatusCode,
      errorType,
      transformer || ((err: any): any => err)
    ));
  }

  constructor () {
    this.handler = (router: Router): void => {
      router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
        const info = getExpectedErrorInfo(err, this.expectedErrors);
        if (info) {
          handleExpectedError(err, res, info);
        } else {
          handleUnexpectedError(err, res);
        }
      });
    };
  }
}

function handleExpectedError(err: any, res: Response, info: ExpectedErrorInfo) {
  Logger.error(err.message, err);
  res
    .type('application/json')
    .status(info.httpStatusCode)
    .send(
      JSON.stringify(info.transform(err))
    );
}

function handleUnexpectedError(err: Error, res: Response) {
  const status = 500;
  let message = 'Internal Server Error';
  Logger.error(err.message, err);
  if (process.env.ENVIROMENT_NAME !== 'prod') {
    message = `${err.name} - ${err.message} - ${err.stack}`;
  }
  res
    .type('application/json')
    .status(status)
    .send({ message });
}

function getExpectedErrorInfo(error: any, expectedErrors: ExpectedErrorInfo[]): ExpectedErrorInfo | null {
  for (let info of expectedErrors) {
    if (error instanceof info.errorType) {
      return info;
    }
  }
  return null;
}

export const ERROR_HANDLER_FACTORY = new ErrorHandlerFactory();