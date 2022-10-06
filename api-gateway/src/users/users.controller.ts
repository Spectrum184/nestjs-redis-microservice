import { Controller, Get, Logger, Param } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { appConfig } from 'src/config';
import { UsersCmd } from './constants';
import { GetUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  private client: ClientProxy;
  private logger: Logger;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: appConfig.getRedisConfig(),
    });
    this.logger = new Logger('Users');
  }

  @Get()
  getAllUsers(): Observable<Array<GetUserDto>> {
    this.logger.log('Get all users');
    return this.client.send(UsersCmd.GET_ALL_USERS, {});
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Observable<GetUserDto> {
    this.logger.log('Get  user', userId);

    return this.client.send(UsersCmd.GET_USER_BY_ID, userId);
  }
}
