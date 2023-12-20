import { Film } from 'src/films/film.entity';
import { Character } from 'src/characters/character.entity';
import { Planet } from 'src/planets/planet.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Species {
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

  @ManyToOne(() => Planet, planet => planet)
  homeworld: Planet;

  @ManyToMany(() => Character, character => character.species)
  characters: Character[];

  @ManyToMany(() => Film, film => film.species)
  films: Film[];
}
