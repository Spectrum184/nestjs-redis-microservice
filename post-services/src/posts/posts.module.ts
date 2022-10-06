import { Logger, Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';

@Module({
  controllers: [PostController],
  providers: [Logger, PostService],
})
export class PostModule {}
