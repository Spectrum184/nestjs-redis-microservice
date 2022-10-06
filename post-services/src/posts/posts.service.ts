import { HttpException, Injectable } from '@nestjs/common';
import { Posts } from './mocks';
import { GetPostDto } from './posts.dto';

@Injectable()
export class PostService {
  async getPosts(): Promise<Array<GetPostDto>> {
    return new Promise((resolve) => {
      resolve(
        Posts.map((post) => {
          return post;
        }),
      );
    });
  }

  async getPostId(postId: string): Promise<GetPostDto> {
    return new Promise((resolve) => {
      const post = Posts.find((u) => u.id === postId);

      if (!post) throw new HttpException('post is not exists', 404);

      resolve(post);
    });
  }
}
