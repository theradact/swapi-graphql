import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponse, ResourceName } from './types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SwapiService {
  private baseURL = `https://swapi.dev/api`;

  // Star Wars API returns 10 results per page and there is no parameter to change this
  private RESULTS_PER_PAGE = 10;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private async fetchPage<RName extends ResourceName>(resource: RName, page: number) {
    const key = Buffer.from(`${resource}-${page}`).toString('base64');
    const cachedData = await this.cacheManager.get(key);

    if (typeof cachedData !== 'undefined') {
      return cachedData as PaginatedResponse<RName>;
    }

    const response = await fetch(`${this.baseURL}/${resource}/?page=${page}&format=json`);
    const responseData = await response.json() as PaginatedResponse<RName>;

    await this.cacheManager.set(key, responseData);

    return responseData;
  }

  private async getResourceCount(resource: ResourceName) {
    /**
     * Get the count from the first page of results
     * Reason: I could not find another way to obtain it from the SWAPI docs
     */
    const firstPage = await this.fetchPage(resource, 1);

    return firstPage.count;
  }

  async getAll<RName extends ResourceName>(resource: RName) {
    const count = await this.getResourceCount(resource);

    const lastPage = Math.ceil(count / this.RESULTS_PER_PAGE);

    const pagesPromises = Array.from({ length: lastPage }, (_, index) => {
      return this.fetchPage(resource, index + 1);
    });

    const pages = await Promise.all(pagesPromises);
  
    return pages.flatMap(page => page.results);
  }
}
