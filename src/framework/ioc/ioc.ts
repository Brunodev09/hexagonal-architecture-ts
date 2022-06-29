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

// Domain Services
iocContainer.bind<exampleDomainService>(exampleDomainService).to(exampleDomainService);

// Controllers
iocContainer.bind<exampleController>(exampleController).to(exampleController);

export { iocContainer };
