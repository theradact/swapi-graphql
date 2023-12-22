import { Film } from 'src/resources/films/film.entity';
import { Character } from 'src/resources/characters/character.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Starship {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  starshipClass: string;

  @Column()
  manufacturer: string;

  @Column()
  costInCredits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  maxAtmospheringSpeed: string;

  @Column()
  hyperdriveRating: string;

  @Column()
  MGLT: string;

  @Column()
  cargoCapacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Film, film => film.starships)
  films: Film[];

  @ManyToMany(() => Character, character => character.starships)
  pilots: Character[];
}
