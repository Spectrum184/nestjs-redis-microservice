import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersCmd } from './constants';
import { GetUserDto } from './users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(readonly userService: UserService, readonly logger: Logger) {}

  @MessagePattern(UsersCmd.GET_ALL_USERS)
  async getAllUser(): Promise<Array<GetUserDto>> {
    this.logger.log('Get all users');
    return await this.userService.getUsers();
  }

  @MessagePattern(UsersCmd.GET_USER_BY_ID)
  async getUserById(userId: string): Promise<GetUserDto> {
    this.logger.log('Get user by id', userId);

    return await this.userService.getUserId(userId);
  }
}
