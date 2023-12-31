import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Film } from '../films/film.entity';
import { Planet } from '../planets/planet.entity';
import { ResourceEntityBase } from '../resource-entity-base.interface';

@Entity()
export class Species implements ResourceEntityBase {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  averageHeight: string;

  @Column()
  averageLifespan: string;

  @Column()
  eyeColors: string;

  @Column()
  hairColors: string;

  @Column()
  skinColors: string;

  @Column()
  language: string;

  @ManyToOne(() => Planet, planet => planet, { onDelete: 'CASCADE' })
  homeworld: Planet;

  @ManyToMany(() => Character, character => character.species, { onDelete: 'CASCADE' })
  characters: Character[];

  @ManyToMany(() => Film, film => film.species, { onDelete: 'CASCADE' })
  films: Film[];
}
