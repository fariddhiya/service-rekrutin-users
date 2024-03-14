import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { IUserService } from './services/user.service.interface';
import { UserService } from './services/user.service';
import { IUserRepository } from './repositories/user.repo.interface';
import { UserRepository } from './repositories/user.repo';
import { SuperLogger } from '../../common/logger/logger.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    SuperLogger,
    {
      provide: 'SERVICE_NAME',
      useValue: 'VOUCHER_SVC',
    },
    {
      provide: 'NODE_ENV',
      useValue: process.env.NODE_ENV,
    },
    {
      provide: Logger,
      useClass: Logger,
    },

    /** Services */
    {
      provide: IUserService,
      useClass: UserService,
    },

    /** Repositories */
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
