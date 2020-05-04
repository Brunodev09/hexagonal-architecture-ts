/**
 * Representa um erro esperado
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
   * Representa um erro de negócio
   */
  export class BusinessError extends ExpectedError {
  
    constructor (message: string) {
      super('ERRO_NEGOCIO', message);
    }
  }
  
  /**
   * Representa um erro de autenticação
   */
  export class AuthenticationError extends ExpectedError {
    constructor (message: string) {
      super('ERRO_AUTENTICACAO', message);
    }
  }
  
  /**
   * Representa um erro de validação em n campos
   */
  export class ValidationError extends ExpectedError {
  
    fields: string[];
  
    constructor (fields: string[], message?: string) {
      super('ERRO_VALIDACAO', message || 'Um ou mais campos são inválidos');
      this.fields = fields;
    }
  }

  /**
   * Representa um erro crítico do qual a aplicação não pode se recuperar
   */
  export class CoreError extends ExpectedError {
    constructor (message: string) {
      super('ERRO_SERVIDOR_INTERNO', message);
    }
  }