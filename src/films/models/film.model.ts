import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Person } from "src/people/models/person.model";
import { Planet } from "src/planets/models/planet.model";
import { Species } from "src/species/models/species.model";
import { Starship } from "src/starships/models/starship.model";
import { Vehicle } from "src/vehicles/models/vehicle.model";

@ObjectType()
export class Film {
  @Field(type => Int, { description: `Unique identifier of this film.` })
  id: number;

  @Field({ description: `The title of this film.` })
  title: string;

  @Field(type => Int, { description: `The episode number of this film.` })
  episodeID: number;

  @Field({ description: `The opening paragraphs at the beginning of this film.` })
  openingCrawl: string;

  @Field({ description: `The name of the director of this film.` })
  director: string;

  @Field({ description: `The name(s) of the producer(s) of this film. Comma separated.` })
  producer: string;

  @Field({ description: `The ISO 8601 date format of film release at original creator country.` })
  releaseDate: string;

  @Field(type => [Species], { description: `An array of species that are in this film.` })
  species: Species[];

  @Field(type => [Starship], { description: `An array of starships that are in this film.` })
  starships: Starship[];

  @Field(type => [Vehicle], { description: `An array of vehicles that are in this film.` })
  vehicles: Vehicle[];

  @Field(type => [Person], { description: `An array of people that are in this film.` })
  characters: Person[];

  @Field(type => [Planet], { description: `An array of planets that are in this film.` })
  planets: Planet[];
}
