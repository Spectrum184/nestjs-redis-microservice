import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostsCmd } from './contants';
import { GetPostDto } from './posts.dto';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(readonly postService: PostService, readonly logger: Logger) {}

  @MessagePattern(PostsCmd.GET_ALL_POSTS)
  async getAllUser(): Promise<Array<GetPostDto>> {
    this.logger.log('Get all posts');
    return await this.postService.getPosts();
  }

  @MessagePattern(PostsCmd.GET_POST_BY_ID)
  async getUserById(postId: string): Promise<GetPostDto> {
    this.logger.log('Get user by id', postId);

    return await this.postService.getPostId(postId);
  }
}
