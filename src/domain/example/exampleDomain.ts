/**
 * Representa um objeto de exemplo com campos fictícios.
 */
export class exampleDomain {
    agencyId?: number;
    cityId?: number;
    clientId?: number;
    userId?: number;
    addressId?: number;
    leadingManagerName: string;
    managers: string[];
    projectType: string;

    constructor(agencyId?: number,
        cityId?: number,
        clientId?: number,
        userId?: number,
        addressId?: number,
        leadingManagerName?: string,
        managers?: string[],
        projectType?: string) {
        this.agencyId = agencyId;
        this.cityId = cityId;
        this.clientId = clientId;
        this.userId = userId;
        this.addressId = addressId;
        this.leadingManagerName = leadingManagerName;
        this.managers = managers;
        this.projectType = projectType;
    }
}
