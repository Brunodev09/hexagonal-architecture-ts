import { inject, injectable } from 'inversify';
import { Controller, Post, Query, Route, Tags, Response, Security, Body, SuccessResponse, Example } from 'tsoa';
import { ValidationError, BusinessError } from '../../../domain/core/error/errors';
import { userApplicationService } from '../../../application/services/userService';
import { userCreatedResponse } from './userCreatedResponse';

interface IUser {
  _id: string;
  name: string;
}

interface IUserCreationParams {
  name: string;
}

@Route('/')
@Tags('User')
@injectable()

export class userController extends Controller {

  constructor (@inject(userApplicationService) private service: userApplicationService) {
    super();
  }

  @Post('/user/create')
  @Example<IUser>({
    _id: "213b21y3g12gy",
    name: "customUsername123",
  })
  @Response<ValidationError>('400', 'Bad Request')
  @Response<BusinessError>('422', 'Business Error')
  @SuccessResponse("201", "User has been created")
  public async post(@Body() requestBody: IUserCreationParams): Promise<userCreatedResponse> {
    const user = await this.service.validateAndCreateUser(requestBody);
    this.setStatus(201);
    return new userCreatedResponse("created", user);
  }
}
