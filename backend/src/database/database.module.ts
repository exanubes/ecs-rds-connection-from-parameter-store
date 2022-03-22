import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '../config/config.service';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const databaseConfig = configService.getDatabaseConfig();
        return {
          dialect: 'postgres',
          database: databaseConfig.name,
          host: databaseConfig.hostname,
          username: databaseConfig.username,
          password: databaseConfig.password,
          port: Number(databaseConfig.port),
          models: [UsersEntity],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
