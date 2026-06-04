import { Test, TestingModule } from '@nestjs/testing';
import { CtfService } from './ctf.service';

describe('CtfService', () => {
  let service: CtfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtfService],
    }).compile();

    service = module.get<CtfService>(CtfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
