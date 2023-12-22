import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { PlanetResourceDto } from "../../swapi/types";
import { Planet } from "./planet.entity";
import { PopulateableService } from "../../populate/populate.service";

@Injectable()
export class PlanetsService implements PopulateableService {
  readonly name = 'Planets';

  public constructor(
    @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
    private readonly swapiService: SwapiService
  ) { }

  private async create(planet: PlanetResourceDto) {
    return this.planetRepository.create({
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

  public async findAll(options?: FindManyOptions<Planet>) {
    return this.planetRepository.find();
  }

  public async findByID(id: string) {
    return this.planetRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPIPlanets = await this.swapiService.getAll('planets');

    const allPlanets = await Promise.all(allSWAPIPlanets.map(this.create, this));

    await this.planetRepository.save(allPlanets);
  }

  public async clear() {
    await this.planetRepository.delete({});
  }
}
