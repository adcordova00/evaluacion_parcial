import { Test, TestingModule } from '@nestjs/testing';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';

describe('SedeController', () => {
  let controller: SedeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SedeController],
      providers: [SedeService],
    }).compile();

    controller = module.get<SedeController>(SedeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
