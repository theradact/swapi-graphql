import { Film } from 'src/films/film.entity';
import { Person } from 'src/people/person.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => Person, person => person.homeworld)
  residents: Person[];

  @ManyToMany(() => Film, film => film.planets)
  films: Film[];
}
