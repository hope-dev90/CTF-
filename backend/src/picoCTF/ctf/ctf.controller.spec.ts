import { Test, TestingModule } from '@nestjs/testing';
import { CtfController } from './ctf.controller';

describe('CtfController', () => {
  let controller: CtfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtfController],
    }).compile();

    controller = module.get<CtfController>(CtfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
