import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Film } from "src/films/models/film.model";
import { Person } from "src/people/models/person.model";
import { Planet } from "src/planets/models/planet.model";

@ObjectType()
export class Species {
  @Field(type => Int, { description: `Unique identifier of this species.` })
  id: number;

  @Field({ description: `The name of this species.` })
  name: string;

  @Field({ description: `The classification of this species, such as "mammal" or "reptile".` })
  classification: string;

  @Field({ description: `The designation of this species, such as "sentient".` })
  designation: string;

  @Field({ description: `The average height of this species in centimeters.` })
  averageHeight: string;

  @Field({ description: `The average lifespan of this species in years.` })
  averageLifespan: string;

  @Field({ description: `A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.` })
  eyeColors: string;

  @Field({ description: `A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.` })
  hairColors: string;

  @Field({ description: `A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.` })
  skinColors: string;

  @Field({ description: `The language commonly spoken by this species.` })
  language: string;

  @Field(type => Planet, { description: `A planet that this species originates from.` })
  homeworld: Planet;

  @Field(type => [Person], { description: `An array of People that are a part of this species.` })
  people: Person[];

  @Field(type => [Film], { description: `An array of Films that this species has appeared in.` })
  films: Film[];
}
