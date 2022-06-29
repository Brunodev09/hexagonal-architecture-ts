/**
 * Represents an expected error
 */
export class ExpectedError {

    code: string;
    message: string;
  
    constructor (code: string, message: string) {
      this.code = code;
      this.message = message;
    }
  }
  
  /**
   * Represents a business error
   */
  export class BusinessError extends ExpectedError {
  
    constructor (message: string) {
      super('BUSINESS_ERROR', message);
    }
  }
  
  /**
   * Represents an authentication error
   */
  export class AuthenticationError extends ExpectedError {
    constructor (message: string) {
      super('ERRO_AUTENTICACAO', message);
    }
  }
  
  /**
   * Represents a validation error
   */
  export class ValidationError extends ExpectedError {
  
    fields: string[];
  
    constructor (fields: string[], message?: string) {
      super('VALIDATION_ERROR', message || 'One or more fields are invalid');
      this.fields = fields;
    }
  }

  /**
   * Represents an unexpected critical error of which the application cannot recover from
   */
  export class CoreError extends ExpectedError {
    constructor (message: string) {
      super('INTERNAL_ERROR', message);
    }
  }