import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { Starship } from "./starship.entity";
import { MappedResource } from "../mapped-resource.abstract";
import { StarshipResourceDTO } from "../../swapi/types";

@Injectable()
export class StarshipsService extends MappedResource<Starship> {
  public constructor(
    @InjectRepository(Starship) protected readonly repository: Repository<Starship>,
    protected readonly swapiService: SwapiService,
  ) {
    super('starships', repository, swapiService);
  }

  protected async create(starship: StarshipResourceDTO) {
    return this.repository.create({
      id: starship.url,
      name: starship.name,
      model: starship.model,
      starshipClass: starship.starship_class,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      hyperdriveRating: starship.hyperdrive_rating,
      MGLT: starship.MGLT,
      cargoCapacity: starship.cargo_capacity,
      consumables: starship.consumables,
    });
  }
}
