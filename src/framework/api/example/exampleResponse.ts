import { exampleDomain } from '../../../domain/example/exampleDomain';

/**
 * Contrato de resposta da API de "exemplo".
 */
export class exampleResponse {
    [key: string]: exampleDomain;
}

/**
 * Cria uma resposta mapeada pelo campo "agencyId" a partir de uma lista.
 * @param exampleList Lista com elementos do domínio "exemplo"
 */
export function newExampleResponse(exampleList: exampleDomain[]): exampleResponse {
    const response: exampleResponse = {};
    exampleList.forEach((item: exampleDomain): void => {
        const { agencyId } = item;
        response[agencyId] = item;
    });
    return response;
}