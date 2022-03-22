import { DynamicModule, Global, Module } from '@nestjs/common';
import { configProvider } from './config.provider';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [configProvider, ConfigService],
      exports: [ConfigService],
    };
  }
}
