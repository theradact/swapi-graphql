import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation } from '@ptc-org/nestjs-query-graphql';
import { FilmDTO } from "src/films/film.dto";
import { CharacterDTO } from "src/characters/character.dto";

@ObjectType('Starship')
@FilterableRelation('films', () => FilmDTO, { description: `An array of Films that this starship has appeared in.` })
@FilterableRelation('pilots', () => CharacterDTO, { description: `An array of characters that this starship has been piloted by.` })
export class StarshipDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this starship. The common name, such as "Death Star".` })
  name: string;

  @FilterableField({ description: `The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".` })
  model: string;

  @FilterableField({ description: `The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation".` })
  starshipClass: string;

  @FilterableField({ description: `The manufacturer of this starship. Comma separated if more than one.` })
  manufacturer: string;

  @FilterableField({ description: `The cost of this starship new, in galactic credits.` })
  costInCredits: string;

  @FilterableField({ description: `The length of this starship in meters.` })
  length: string;

  @FilterableField({ description: `The number of personnel needed to run or pilot this starship.` })
  crew: string;

  @FilterableField({ description: `The number of non-essential characters this starship can transport.` })
  passengers: string;

  @FilterableField({ description: `The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.` })
  maxAtmospheringSpeed: string;

  @FilterableField({ description: `The class of this starships hyperdrive.` })
  hyperdriveRating: string;

  @FilterableField({ description: `The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.` })
  MGLT: string;

  @FilterableField({ description: `The maximum number of kilograms that this starship can transport.` })
  cargoCapacity: string;

  @FilterableField({ description: `The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.` })
  consumables: string;
}
