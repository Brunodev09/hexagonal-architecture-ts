import { inject, injectable } from 'inversify';
import { exampleDomain } from '../../domain/example/exampleDomain';
import { ProjectSection } from '../../domain/example/exampleEnum';
import { exampleDomainService } from '../../domain/example/exampleDomainService';

import { Http, HttpResponse } from '../../../libs/http';
import mockResponse from '../../framework/mock/httpResponseMock.json';
import { BusinessError } from '../../domain/core/error/errors';

@injectable()
export class exampleApplicationService {

  private readonly AGENCY_NOT_EXISTS: string = 'Invalid agency ID.';

  constructor(
    @inject(exampleDomainService) private exService: exampleDomainService,
  ) { }

  public async getExample(agencyId: number, projectType: ProjectSection):
    Promise<exampleDomain[]> {

    const http = new Http("https://ourjavasrvhost.com/api");

    let response: any = {};
    try {
      if (agencyId <= 3) response = await http.mockSuccess(mockResponse);
      else response = await http.mockFailed(400, "Not found");
    } catch (e) {
      throw new BusinessError(this.AGENCY_NOT_EXISTS);
    }

    return this.exService.applyBusinessLogicToExample(response.data, projectType);
  }
}
