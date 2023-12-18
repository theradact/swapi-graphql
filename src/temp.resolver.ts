import { Query, Resolver } from "@nestjs/graphql";

/**
 * This is a temporary resolver before I create the actual resolvers for the resources
 * It's purpose is to allow for the code to compile properly
 */
@Resolver()
export class TempResolver {

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
