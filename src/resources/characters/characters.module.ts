import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Character } from './character.entity';
import { CharacterDTO } from './character.dto';
import { CharactersService } from './characters.service';
import { SwapiModule } from 'src/swapi/swapi.module';
import { PlanetsModule } from 'src/resources/planets/planets.module';
import { SpeciesModule } from 'src/resources/species/species.module';
import { StarshipsModule } from 'src/resources/starships/starships.module';
import { VehiclesModule } from 'src/resources/vehicles/vehicles.module';

@Module({
  imports: [
    SwapiModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Character])],
      resolvers: [
        {
          EntityClass: Character,
          DTOClass: CharacterDTO,
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
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
