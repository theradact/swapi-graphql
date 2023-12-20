import { Film } from 'src/films/film.entity';
import { Person } from 'src/people/person.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Vehicle {
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

  @ManyToMany(() => Film, film => film.vehicles)
  films: Film[];

  @ManyToMany(() => Person, person => person.vehicles)
  pilots: Person[];
}
