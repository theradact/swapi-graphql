import { FilmEntity } from 'src/films/film.entity';
import { PersonEntity } from 'src/people/person.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class PlanetEntity {
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

  @OneToMany(type => PersonEntity, person => person.id)
  residents: PersonEntity[];

  @OneToMany(type => FilmEntity, film => film.id)
  films: FilmEntity[];
}
