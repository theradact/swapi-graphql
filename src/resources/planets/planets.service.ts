import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { Planet } from "./planet.entity";
import { MappedResource } from "../mapped-resource.abstract";
import { PlanetResourceDTO } from "../../swapi/types";

@Injectable()
export class PlanetsService extends MappedResource<Planet> {
  public constructor(
    @InjectRepository(Planet) protected readonly repository: Repository<Planet>,
    protected readonly swapiService: SwapiService,
  ) {
    super('planets', repository, swapiService);
  }

  protected async create(planet: PlanetResourceDTO) {
    return this.repository.create({
      id: planet.url,
      name: planet.name,
      diameter: planet.diameter,
      rotationPeriod: planet.rotation_period,
      orbitalPeriod: planet.orbital_period,
      gravity: planet.gravity,
      population: planet.population,
      climate: planet.climate,
      terrain: planet.terrain,
      surfaceWater: planet.surface_water,
    });
  }
}
