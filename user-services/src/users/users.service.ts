import { HttpException, Injectable } from '@nestjs/common';
import { Users } from './mocks';
import { GetUserDto } from './users.dto';

@Injectable()
export class UserService {
  async getUsers(): Promise<Array<GetUserDto>> {
    return new Promise((resolve) => {
      resolve(
        Users.map((user) => {
          delete user.password;
          return user;
        }),
      );
    });
  }

  async getUserId(userId: string): Promise<GetUserDto> {
    return new Promise((resolve) => {
      const user = Users.find((u) => u.id === userId);

      if (!user) throw new HttpException('User is not exists', 404);

      delete user.password;

      resolve(user);
    });
  }
}
