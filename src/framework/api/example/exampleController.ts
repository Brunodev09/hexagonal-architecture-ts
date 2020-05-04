import { inject, injectable } from 'inversify';
import { Controller, Get, Query, Route, Tags, Response, Security } from 'tsoa';
import { exampleApplicationService } from '../../../application/services/exampleService';
import { ProjectSection } from '../../../domain/example/exampleEnum';
import { exampleResponse, newExampleResponse } from './exampleResponse';
import { exampleDomain } from '../../../domain/example/exampleDomain';
import { ValidationError, BusinessError } from '../../../domain/core/error/errors';

/**
 * API REST template para projetos de Node + Typescript para projetos da CI&T.
 */
@Route('/')
@Tags('example')
@injectable()
export class exampleController extends Controller {

  readonly INVALID_PROJECT: string = 'Invalid project type.';
  readonly INVALID_AGENCY: string = 'Invalid agency id.';

  constructor (@inject(exampleApplicationService) private exService: exampleApplicationService) {
    super();
  }

  @Get('/example/{agencyId}/{projectType}/agency')
  @Response<ValidationError>('400', 'Bad Request')
  @Response<BusinessError>('422', 'Business Error')
  public async get(agencyId: number, @Query() projectType: ProjectSection):
    Promise<exampleResponse> {
    const exList: exampleDomain[] = await this.exService.getExample(agencyId, projectType);
    return newExampleResponse(exList);
  }
}
