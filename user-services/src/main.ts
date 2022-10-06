import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'USER_SERVICE',
    transport: Transport.REDIS,
    options: appConfig.getRedisConfig(),
  });

  await app.listen();
}
bootstrap();
