import { FilmEntity } from 'src/films/film.entity';
import { PersonEntity } from 'src/people/person.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
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

  @OneToMany(type => PlanetEntity, planet => planet.id)
  homeworld: PlanetEntity;

  @OneToMany(type => PersonEntity, person => person.id)
  people: PersonEntity[];

  @OneToMany(type => FilmEntity, species => species.id)
  films: FilmEntity[];
}
