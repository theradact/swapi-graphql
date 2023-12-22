import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Film } from '../films/film.entity';

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

  @ManyToMany(() => Film, film => film.vehicles, {onDelete:'CASCADE'})
  films: Film[];

  @ManyToMany(() => Character, character => character.vehicles, {onDelete:'CASCADE'})
  pilots: Character[];
}
