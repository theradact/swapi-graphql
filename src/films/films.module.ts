import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Film } from './film.entity';
import { FilmDTO } from './film.dto';

@Module({
  imports: [
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
})
export class FilmsModule {}
