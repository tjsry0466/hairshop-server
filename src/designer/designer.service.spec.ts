import { Test, TestingModule } from '@nestjs/testing';
import { DesignerService } from './designer.service';

describe('DesignerService', () => {
  let service: DesignerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignerService],
    }).compile();

    service = module.get<DesignerService>(DesignerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
