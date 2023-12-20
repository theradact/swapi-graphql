import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonDTO } from './person.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Person])],
      resolvers: [
        {
          EntityClass: Person,
          DTOClass: PersonDTO,
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
export class PeopleModule {}
