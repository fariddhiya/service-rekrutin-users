import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as WinstonTransport from 'winston-transport';
import { format, transports } from 'winston';
import { GrpcExceptionFilter } from './common/exceptions/grpc.excecption.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { useContainer } from 'class-validator';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { SuperLogger } from './common/logger/logger.service';

async function bootstrap() {
  //setup winston logger
  const winstonTransport: WinstonTransport[] = [
    new transports.Console({
      format: format.printf((info) => {
        return info.message;
      }),
    }),
  ];

  // GRPC
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    logger: WinstonModule.createLogger({ transports: winstonTransport }),
    options: {
      url: `0.0.0.0:${process.env.PORT}`,
      package: ['user'],
      protoPath: [join(__dirname, '../src/modules/user/protobuf/user.proto')],
      maxSendMessageLength: 1024 * 1024 * 7,
      maxReceiveMessageLength: 1024 * 1024 * 7,
      loader: {
        keepCase: true,
        longs: Number,
        enums: String,
        defaults: false,
        arrays: true,
        objects: true,
        includeDirs: [
          join(__dirname, '../src/modules/user/protobuf/user.proto'),
        ],
      },
    },
  });

  const logger = app.get(SuperLogger);
  app.useGlobalFilters(new GrpcExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen();
}

bootstrap().then(() =>
  Logger.log(`App Started ${process.env.PORT}`, process.env.PORT || 3006),
);
