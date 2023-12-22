import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Starship } from './starship.entity';
import { StarshipDTO } from './starship.dto';
import { StarshipsService } from './starships.service';
import { SwapiModule } from '../../swapi/swapi.module';

@Module({
  imports: [
    SwapiModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Starship])],
      resolvers: [
        {
          EntityClass: Starship,
          DTOClass: StarshipDTO,
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
  providers: [StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {}
