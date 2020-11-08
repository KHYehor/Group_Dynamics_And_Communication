import { Test, TestingModule } from '@nestjs/testing';
import { AssigmentController } from './assignment.controller';

describe('AssigmentController', () => {
  let controller: AssigmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigmentController],
    }).compile();

    controller = module.get<AssigmentController>(AssigmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
