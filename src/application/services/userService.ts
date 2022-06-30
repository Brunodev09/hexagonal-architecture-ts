import { inject, injectable } from 'inversify';
import { exampleDomain } from '../../domain/example/exampleDomain';
import { ProjectSection } from '../../domain/example/exampleEnum';
import { userDomainService } from '../../domain/user/userDomainService';

import { Http, HttpResponse } from '../../../libs/http';
import mockResponse from '../../framework/mock/httpResponseMock.json';
import { BusinessError, ValidationError } from '../../domain/core/error/errors';
import { IUser, IUserCreationParams } from 'interfaces/IUser';
import { isAlphaNumeric, isMaxChar } from '../../../libs/utils';
import { Logger } from '../../../libs/logger';

@injectable()
export class userApplicationService {

  constructor(
    @inject(userDomainService) private service: userDomainService,
  ) { }

  public async validateAndCreateUser(requestUser: IUserCreationParams):
    Promise<IUser> {
        if (!isAlphaNumeric(requestUser.name) || !isMaxChar(requestUser.name, 14)) {
          throw new ValidationError(["name"], "Username must be alphanumeric and only 14 characters long.");
        }

    return await this.service.createUser(requestUser);
  }
}
