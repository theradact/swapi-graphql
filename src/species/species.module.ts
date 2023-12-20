import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Species } from './species.entity';
import { SpeciesDTO } from './species.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Species])],
      resolvers: [
        {
          EntityClass: Species,
          DTOClass: SpeciesDTO,
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
})
export class SpeciesModule {}
