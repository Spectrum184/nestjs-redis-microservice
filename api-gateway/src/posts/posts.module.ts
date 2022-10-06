import { Logger, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [Logger],
})
export class PostModule {}
