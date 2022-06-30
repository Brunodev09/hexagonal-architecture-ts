import { injectable } from 'inversify';
import { User } from './userDomain';
import { ProjectSection } from '../../domain/example/exampleEnum';
import { IUser, IUserCreationParams } from 'interfaces/IUser';
import { BusinessError } from '../../domain/core/error/errors';

@injectable()
export class userDomainService {

    public async createUser(preUser: IUserCreationParams): Promise<IUser> {
        try {
            const user = new User<IUserCreationParams>(preUser);
            return await user.save();
        } catch (ex) {
            throw new BusinessError("Error creating user model.");
        }
    }
}
