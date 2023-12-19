import { FilmEntity } from 'src/films/film.entity';
import { PersonEntity } from 'src/people/person.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class VehicleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  vehicleClass: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column()
  costInCredits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  maxAtmospheringSpeed: string;

  @Column()
  cargoCapacity: string;

  @Column()
  consumables: string;

  @ManyToMany(type => FilmEntity, film => film.vehicles)
  films: FilmEntity[];

  @ManyToMany(type => PersonEntity, person => person.vehicles)
  pilots: PersonEntity[];
}
