import { Test, TestingModule } from '@nestjs/testing';

import { ReviewCommentService } from './review-comment.service';

describe('ReviewCommentService', () => {
  let service: ReviewCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewCommentService],
    }).compile();

    service = module.get<ReviewCommentService>(ReviewCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
