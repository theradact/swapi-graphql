import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Film } from '../films/film.entity';

@Entity()
export class Planet {
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

  @OneToMany(() => Character, character => character.homeworld)
  residents: Character[];

  @ManyToMany(() => Film, film => film.planets)
  films: Film[];
}
