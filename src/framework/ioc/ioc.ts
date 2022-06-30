import { userApplicationService } from '../../application/services/userService';
import { userDomainService } from '../../domain/user/userDomainService';
import { userController } from '../../framework/api/user/userController';
import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { Controller } from 'tsoa';
import { exampleApplicationService } from '../../application/services/exampleService';
import { exampleDomainService } from '../../domain/example/exampleDomainService';
import { exampleController } from '../api/example/exampleController';

const iocContainer = new Container();

// Creating custom Typescript decorator.
decorate(injectable(), Controller);

// Inversion of control in dependencies.

// Services
iocContainer.bind<exampleApplicationService>(exampleApplicationService).to(exampleApplicationService);
iocContainer.bind<userApplicationService>(userApplicationService).to(userApplicationService);

// Domain Services
iocContainer.bind<exampleDomainService>(exampleDomainService).to(exampleDomainService);
iocContainer.bind<userDomainService>(userDomainService).to(userDomainService);


// Controllers
iocContainer.bind<exampleController>(exampleController).to(exampleController);
iocContainer.bind<userController>(userController).to(userController);


export { iocContainer };
