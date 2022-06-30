import { IUser } from "interfaces/IUser";

export class userCreatedResponse {
    private action: string;
    private created: string;
    constructor(action: string, created: IUser) {
        this.action = action;
        this.created = JSON.stringify(created);
    }
}