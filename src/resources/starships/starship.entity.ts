import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Film } from '../films/film.entity';
import { ResourceEntityBase } from '../resource-entity-base.interface';

@Entity()
export class Starship implements ResourceEntityBase {
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

  @ManyToMany(() => Film, film => film.starships, { onDelete: 'CASCADE' })
  films: Film[];

  @ManyToMany(() => Character, character => character.starships, { onDelete: 'CASCADE' })
  pilots: Character[];
}
