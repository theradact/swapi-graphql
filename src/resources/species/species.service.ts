import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SwapiService } from "src/swapi/swapi.service";
import { SpeciesResourceDto } from "src/swapi/types";
import { Species } from "./species.entity";
import { PlanetsService } from "src/resources/planets/planets.service";

@Injectable()
export class SpeciesService {
  public constructor(
    @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
    private readonly planetsService: PlanetsService,
    private readonly swapiService: SwapiService
  ) { }

  private async create(species: SpeciesResourceDto) {
    const newSpecies = this.speciesRepository.create({
      id: species.url,
      name: species.name,
      classification: species.classification,
      designation: species.designation,
      averageHeight: species.average_height,
      averageLifespan: species.average_lifespan,
      eyeColors: species.eye_colors,
      hairColors: species.hair_colors,
      skinColors: species.skin_colors,
      language: species.language,
    });

    newSpecies.homeworld = await this.planetsService.findByID(species.homeworld);

    return newSpecies;
  }

  public async findAll(options?: FindManyOptions<Species>) {
    return this.speciesRepository.find();
  }

  public async findByID(id: string) {
    return this.speciesRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPISpecies = await this.swapiService.getAll('species');

    const allSpecies = await Promise.all(allSWAPISpecies.map(this.create, this));

    await this.speciesRepository.clear();
    await this.speciesRepository.save(allSpecies);
  }
}
