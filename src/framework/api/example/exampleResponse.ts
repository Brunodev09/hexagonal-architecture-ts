import { exampleDomain } from '../../../domain/example/exampleDomain';

export class exampleResponse {
    [key: string]: exampleDomain;
}

export function newExampleResponse(exampleList: exampleDomain[]): exampleResponse {
    const response: exampleResponse = {};
    exampleList.forEach((item: exampleDomain): void => {
        const { agencyId } = item;
        response[agencyId] = item;
    });
    return response;
}