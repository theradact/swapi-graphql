import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Film } from './film.entity';
import { FilmDTO } from './film.dto';
import { FilmsService } from './films.service';
import { SwapiModule } from 'src/swapi/swapi.module';
import { SpeciesModule } from 'src/resources/species/species.module';
import { StarshipsModule } from 'src/resources/starships/starships.module';
import { VehiclesModule } from 'src/resources/vehicles/vehicles.module';
import { CharactersModule } from 'src/resources/characters/characters.module';
import { PlanetsModule } from 'src/resources/planets/planets.module';

@Module({
  imports: [
    SwapiModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    CharactersModule,
    PlanetsModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Film])],
      resolvers: [
        {
          EntityClass: Film,
          DTOClass: FilmDTO,
          create: {
            disabled: true,
          },
          read: {
            disabled: false,
          },
          update: {
            disabled: true,
          },
          delete: {
            disabled: true,
          }
        },
      ],
    }),
  ],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
