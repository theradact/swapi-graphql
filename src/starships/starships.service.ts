import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SwapiService } from "src/swapi/swapi.service";
import { Starship } from "./Starship.entity";
import { StarshipResourceDto } from "src/swapi/types";

@Injectable()
export class StarshipsService {
  public constructor(
    @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
    private readonly swapiService: SwapiService
  ) { }

  private async create(starship: StarshipResourceDto) {
    return this.starshipRepository.create({
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

  public async findAll(options?: FindManyOptions<Starship>) {
    return this.starshipRepository.find();
  }

  public async findByID(id: string) {
    return this.starshipRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPIStarships = await this.swapiService.getAll('starships');

    const allStarships = await Promise.all(allSWAPIStarships.map(this.create, this));

    await this.starshipRepository.clear();
    await this.starshipRepository.save(allStarships);
  }
}
