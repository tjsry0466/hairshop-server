import { Resolver } from '@nestjs/graphql';

import { ReviewCommentService } from './review-comment.service';

@Resolver()
export class ReviewCommentResolver {
  constructor(private readonly reviewCommentService: ReviewCommentService) {}
}
