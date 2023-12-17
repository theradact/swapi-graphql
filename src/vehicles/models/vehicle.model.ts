import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Film } from "src/films/models/film.model";
import { Person } from "src/people/models/person.model";

@ObjectType()
export class Vehicle {
  @Field(type => Int, { description: `Unique identifier of this vehicle.` })
  id: number;

  @Field({ description: `The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".` })
  name: string;

  @Field({ description: `The model or official name of this vehicle. Such as "All-Terrain Attack Transport".` })
  model: string;

  @Field({ description: `The class of this vehicle, such as "Wheeled" or "Repulsorcraft".` })
  vehicleClass: string;

  @Field({ description: `The manufacturer of this vehicle. Comma separated if more than one.` })
  manufacturer: string;

  @Field({ description: `The length of this vehicle in meters.` })
  length: string;

  @Field({ description: `The cost of this vehicle new, in Galactic Credits.` })
  costInCredits: string;

  @Field({ description: `The number of personnel needed to run or pilot this vehicle.` })
  crew: string;

  @Field({ description: `The number of non-essential people this vehicle can transport.` })
  passengers: string;

  @Field({ description: `The maximum speed of this vehicle in the atmosphere.` })
  maxAtmospheringSpeed: string;

  @Field({ description: `The maximum number of kilograms that this vehicle can transport.` })
  cargoCapacity: string;

  @Field({ description: `The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.` })
  consumables: string;

  @Field(type => [Film], { description: `An array of Films that this vehicle has appeared in.` })
  films: Film[];

  @Field(type => [Person], { description: `An array of People that this vehicle has been piloted by.` })
  pilots: Person[];
}
