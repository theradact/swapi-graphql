import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation } from '@ptc-org/nestjs-query-graphql';
import { FilmDTO } from "src/films/film.dto";
import { CharacterDTO } from "src/characters/character.dto";

@ObjectType('Vehicle')
@FilterableRelation('films', () => FilmDTO, { description: `An array of Films that this vehicle has appeared in.` })
@FilterableRelation('pilots', () => CharacterDTO, { description: `An array of characters that this vehicle has been piloted by.` })
export class VehicleDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".` })
  name: string;

  @FilterableField({ description: `The model or official name of this vehicle. Such as "All-Terrain Attack Transport".` })
  model: string;

  @FilterableField({ description: `The class of this vehicle, such as "Wheeled" or "Repulsorcraft".` })
  vehicleClass: string;

  @FilterableField({ description: `The manufacturer of this vehicle. Comma separated if more than one.` })
  manufacturer: string;

  @FilterableField({ description: `The length of this vehicle in meters.` })
  length: string;

  @FilterableField({ description: `The cost of this vehicle new, in Galactic Credits.` })
  costInCredits: string;

  @FilterableField({ description: `The number of personnel needed to run or pilot this vehicle.` })
  crew: string;

  @FilterableField({ description: `The number of non-essential characters this vehicle can transport.` })
  passengers: string;

  @FilterableField({ description: `The maximum speed of this vehicle in the atmosphere.` })
  maxAtmospheringSpeed: string;

  @FilterableField({ description: `The maximum number of kilograms that this vehicle can transport.` })
  cargoCapacity: string;

  @FilterableField({ description: `The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.` })
  consumables: string;
}
