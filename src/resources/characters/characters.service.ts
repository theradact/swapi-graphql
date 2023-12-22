import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { PersonResourceDto } from "../../swapi/types";
import { PlanetsService } from "../planets/planets.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/starships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { Character } from "./character.entity";
import { PopulateableService } from "../../populate/populate.service";

@Injectable()
export class CharactersService implements PopulateableService {
  readonly name = 'Characters';

  public constructor(
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly starshipsService: StarshipsService,
    private readonly vehiclesService: VehiclesService,
    private readonly swapiService: SwapiService
  ) { }

  private async create(person: PersonResourceDto) {
    const newCharacter = this.characterRepository.create({
      id: person.url,
      name: person.name,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      gender: person.gender,
      hairColor: person.hair_color,
      height: person.height,
      mass: person.mass,
      skinColor: person.skin_color,
    });

    [
      newCharacter.homeworld,
      newCharacter.species,
      newCharacter.starships,
      newCharacter.vehicles
    ] = await Promise.all([
      this.planetsService.findByID(person.homeworld),
      Promise.all(person.species.map(speciesID => this.speciesService.findByID(speciesID))),
      Promise.all(person.starships.map(starshipID => this.starshipsService.findByID(starshipID))),
      Promise.all(person.vehicles.map(vehicleID => this.vehiclesService.findByID(vehicleID)))
    ]);

    return newCharacter;
  }

  public async findAll(options?: FindManyOptions<Character>) {
    return this.characterRepository.find();
  }

  public async findByID(id: string) {
    return this.characterRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPICharacters = await this.swapiService.getAll('people');

    const allCharacters = await Promise.all(allSWAPICharacters.map(this.create, this));

    await this.characterRepository.save(allCharacters);
  }

  public async clear() {
    await this.characterRepository.delete({});
  }
}
