import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { ResourceDTO, ResourceName } from "../swapi/types";
import { SwapiService } from "../swapi/swapi.service";
import { ResourceEntityBase } from "./resource-entity-base.interface";
import merge = require('lodash/merge');

export abstract class MappedResource<Entity extends ResourceEntityBase> {
  /**
   * @param resource Name of the mapped resource on the Star Wars API
   * @param repository TypeORM repository for this resource entity
   * @param swapiService Star Wars API Service
   */
  constructor(
    protected readonly resource: ResourceName,
    protected readonly repository: Repository<Entity>,
    protected readonly swapiService: SwapiService
  ) { }

  /**
   * Creates this resource entity using Star Wars API DTO.
   * 
   * @param dto Star Wars API Resource DTO
   * @returns Promise resolving to this resource entity
   */
  protected abstract create(dto: ResourceDTO<typeof this.resource>): Promise<Entity>;

  /**
   * Populates this resource with data from the Star Wars API.
   */
  public async populate() {
    const dtoArray = await this.swapiService.getAll(this.resource);
    const entities = await Promise.all(dtoArray.map(dto => this.create(dto)));
    await this.repository.save(entities);
  }

  /**
   * Deletes all entities of this resource.
   */
  public async clear() {
    await this.repository.delete({});
  }

  /**
   * Finds entities that match given find options.
   * 
   * @param options Defines a special criteria to find specific entities
   * @returns Array of entities
   */
  public async findAll(options?: FindManyOptions<Entity>) {
    return this.repository.find(options);
  }

  /**
   * Finds first entity by a given ID. If entity was not found in the database - returns null.
   * 
   * @param id the id property of the searched entity
   * @param options Defines a special criteria to find specific entity
   * @returns Entity or null if entity is not found
   */
  public async findByID(id: string, options?: FindOneOptions<Entity>) {
    const findOptions = merge({ where: { id } }, options);

    return this.repository.findOne(findOptions);
  }
}
