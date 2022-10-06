import { Controller, Get, Logger, Param } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { appConfig } from 'src/config';
import { PostsCmd } from './contants';
import { GetPostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  private client: ClientProxy;
  private logger: Logger;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: appConfig.getRedisConfig(),
    });
    this.logger = new Logger('Posts');
  }

  @Get()
  getAllUsers(): Observable<Array<GetPostDto>> {
    this.logger.log('Get all posts');
    return this.client.send(PostsCmd.GET_ALL_POSTS, {});
  }

  @Get(':postId')
  getUserById(@Param('postId') postId: string): Observable<GetPostDto> {
    this.logger.log('Get  post', postId);

    return this.client.send(PostsCmd.GET_POST_BY_ID, postId);
  }
}
