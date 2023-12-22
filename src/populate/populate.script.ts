import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { PopulateService } from "./populate.service";

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const populateService = app.get(PopulateService);

  await populateService.populate();
  await app.close();
  process.exit();
}

bootstrap();
