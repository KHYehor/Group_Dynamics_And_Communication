import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import fastifyCookie from "fastify-cookie";

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { init } from "./init";


async function bootstrap() {
  init();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  // app.setGlobalPrefix('api');
  await app.listen(3000);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // console.log(global.UsersByLogin);
}
bootstrap();
