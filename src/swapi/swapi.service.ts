import { Injectable } from '@nestjs/common';
import { Resource } from './types';

@Injectable()
export class SwapiService {
  private baseURL = `https://swapi.dev/api/`;

  private getResourceCount(resource: Resource): number {
    return 1;
  }

  findAll<R extends Resource>(resource: R) {
    return `This action returns all swapi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} swapi`;
  }
}
