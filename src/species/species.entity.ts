import { FilmEntity } from 'src/films/film.entity';
import { PersonEntity } from 'src/people/person.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('species')
export class SpeciesEntity {
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

  @OneToMany(type => PlanetEntity, planet => planet)
  homeworld: PlanetEntity;

  @ManyToMany(type => PersonEntity, person => person.species)
  people: PersonEntity[];

  @ManyToMany(type => FilmEntity, film => film.species)
  films: FilmEntity[];
}
