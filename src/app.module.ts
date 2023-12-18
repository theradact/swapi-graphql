import { Module } from '@nestjs/common';
import { SwapiModule } from './swapi/swapi.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TempResolver } from './temp.resolver';

@Module({
  imports: [
    SwapiModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
  ],
  providers: [TempResolver],
})
export class AppModule {}
