import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import config from './common/config/config';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfgService: ConfigService) => {
        return {
          type: 'mysql',
          entities: [__dirname + '**/**/**/*.entity.{ts,js}'],
          synchronize: false,
          replication: {
            master: {
              type: 'mysql',
              host: cfgService.get<string>('mysqlConfig.master.host'),
              port: cfgService.get<number>('mysqlConfig.master.port'),
              username: cfgService.get<string>('mysqlConfig.master.user'),
              password: cfgService.get<string>('mysqlConfig.master.password'),
              database: cfgService.get<string>('mysqlConfig.master.database'),
              poolSize: +cfgService.get<string>('mysqlConfig.master.poolSize'),
              synchronize: false,
              ssl: false,
            },
            slaves: [
              {
                host: cfgService.get<string>('mysqlConfig.slave.host'),
                port: cfgService.get<number>('mysqlConfig.slave.port'),
                username: cfgService.get<string>('mysqlConfig.slave.user'),
                password: cfgService.get<string>('mysqlConfig.slave.password'),
                database: cfgService.get<string>('mysqlConfig.slave.database'),
                poolSize: +cfgService.get<string>('mysqlConfig.slave.poolSize'),
                synchronize: false,
              },
            ],
          },
        };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
