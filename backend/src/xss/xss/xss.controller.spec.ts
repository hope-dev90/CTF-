import { Test, TestingModule } from '@nestjs/testing';
import { XssController } from './xss.controller';

describe('XssController', () => {
  let controller: XssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XssController],
    }).compile();

    controller = module.get<XssController>(XssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
