import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Film } from "src/films/models/film.model";
import { Person } from "src/people/models/person.model";

@ObjectType()
export class Starship {
  @Field(type => Int, { description: `Unique identifier of this starship.` })
  id: number;

  @Field({ description: `The name of this starship. The common name, such as "Death Star".` })
  name: string;

  @Field({ description: `The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".` })
  model: string;

  @Field({ description: `The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation".` })
  starshipClass: string;

  @Field({ description: `The manufacturer of this starship. Comma separated if more than one.` })
  manufacturer: string;

  @Field({ description: `The cost of this starship new, in galactic credits.` })
  costInCredits: string;

  @Field({ description: `The length of this starship in meters.` })
  length: string;

  @Field({ description: `The number of personnel needed to run or pilot this starship.` })
  crew: string;

  @Field({ description: `The number of non-essential people this starship can transport.` })
  passengers: string;

  @Field({ description: `The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.` })
  maxAtmospheringSpeed: string;

  @Field({ description: `The class of this starships hyperdrive.` })
  hyperdriveRating: string;

  @Field({ description: `The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.` })
  MGLT: string;

  @Field({ description: `The maximum number of kilograms that this starship can transport.` })
  cargoCapacity: string;

  @Field({ description: `The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.` })
  consumables: string;

  @Field(type => [Film], { description: `An array of Films that this starship has appeared in.` })
  films: Film[];

  @Field(type => [Person], { description: `An array of People that this starship has been piloted by.` })
  pilots: Person[];
}
