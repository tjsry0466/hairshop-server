import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewComment } from './entity/review-comment.entity';
import { ReviewCommentResolver } from './review-comment.resolver';
import { ReviewCommentService } from './review-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewComment])],
  providers: [ReviewCommentResolver, ReviewCommentService],
})
export class ReviewCommentModule {}
