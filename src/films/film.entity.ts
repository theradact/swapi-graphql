import { Person } from 'src/people/person.entity';
import { Planet } from 'src/planets/planet.entity';
import { Species } from 'src/species/species.entity';
import { Starship } from 'src/starships/starship.entity';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  episodeID: number;

  @Column()
  openingCrawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  releaseDate: string;

  @ManyToMany(() => Species, species => species.films)
  @JoinTable({ name: 'film_species' })
  species: Species[];

  @ManyToMany(() => Starship, starship => starship.films)
  @JoinTable({ name: 'film_starships' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, vehicle => vehicle.films)
  @JoinTable({ name: 'film_vehicles' })
  vehicles: Vehicle[];

  @ManyToMany(() => Person, person => person.films)
  @JoinTable({ name: 'film_people' })
  characters: Person[];

  @ManyToMany(() => Planet, planet => planet.films)
  @JoinTable({ name: 'film_planets' })
  planets: Planet[];
}
