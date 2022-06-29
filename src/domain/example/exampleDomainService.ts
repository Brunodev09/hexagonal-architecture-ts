import { injectable } from 'inversify';
import { exampleDomain } from './exampleDomain';
import { ProjectSection } from '../../domain/example/exampleEnum';

@injectable()
export class exampleDomainService {

  public applyBusinessLogicToExample(items: exampleDomain[], type: string): exampleDomain[] {
    const mapped: Map<string, exampleDomain[]> = new Map();
    const itemsToReturn: exampleDomain[] = [];
    
    items.forEach((item: exampleDomain): void => {
      if (!mapped.get(item.projectType)) mapped.set(item.projectType, []);
      let list = mapped.get(item.projectType);
      list.push(item);
      mapped.set(item.projectType, list);
    });
    for (let key of mapped.keys()) {
      if (key === type) {
        for (let item of mapped.get(key)) {
          itemsToReturn.push(item);
        }
      }
    }
    return itemsToReturn;
  }

}
