import { FilmEntity } from 'src/films/film.entity';
import { PersonEntity } from 'src/people/person.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class StarshipEntity {
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

  @ManyToMany(type => FilmEntity, film => film.starships)
  films: FilmEntity[];

  @ManyToMany(type => PersonEntity, person => person.starships)
  pilots: PersonEntity[];
}
