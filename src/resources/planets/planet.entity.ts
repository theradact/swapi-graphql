import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Film } from '../films/film.entity';
import { ResourceEntityBase } from '../resource-entity-base.interface';

@Entity()
export class Planet implements ResourceEntityBase {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  diameter: string;

  @Column()
  rotationPeriod: string;

  @Column()
  orbitalPeriod: string;

  @Column()
  gravity: string;

  @Column()
  population: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column()
  surfaceWater: string;

  @OneToMany(() => Character, character => character.homeworld, { onDelete: 'CASCADE' })
  residents: Character[];

  @ManyToMany(() => Film, film => film.planets, { onDelete: 'CASCADE' })
  films: Film[];
}
