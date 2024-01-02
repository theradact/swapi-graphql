import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { PlanetsService } from "../planets/planets.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/starships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { Character } from "./character.entity";
import { MappedResource } from "../mapped-resource.abstract";
import { PersonResourceDTO } from "../../swapi/types";

@Injectable()
export class CharactersService extends MappedResource<Character> {
  public constructor(
    @InjectRepository(Character) protected readonly repository: Repository<Character>,
    protected readonly swapiService: SwapiService,
    protected readonly planetsService: PlanetsService,
    protected readonly speciesService: SpeciesService,
    protected readonly starshipsService: StarshipsService,
    protected readonly vehiclesService: VehiclesService,
  ) { 
    super('people', repository, swapiService);
  }

  protected async create(person: PersonResourceDTO) {
    const newCharacter = this.repository.create({
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
}
