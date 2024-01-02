import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { PlanetsService } from "../planets/planets.service";
import { Species } from "./species.entity";
import { ResourceService } from "../resource.service";
import { SpeciesResourceDTO } from "../../swapi/types";

@Injectable()
export class SpeciesService extends ResourceService<Species> {
  public constructor(
    @InjectRepository(Species) protected readonly repository: Repository<Species>,
    protected readonly swapiService: SwapiService,
    protected readonly planetsService: PlanetsService,
  ) {
    super('species', repository, swapiService);
  }

  protected async create(species: SpeciesResourceDTO) {
    const newSpecies = this.repository.create({
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
}
