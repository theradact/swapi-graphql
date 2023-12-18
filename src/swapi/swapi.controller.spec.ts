import { Test, TestingModule } from '@nestjs/testing';
import { SwapiController } from './swapi.controller';
import { SwapiService } from './swapi.service';

describe('SwapiController', () => {
  let controller: SwapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapiController],
      providers: [SwapiService],
    }).compile();

    controller = module.get<SwapiController>(SwapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
