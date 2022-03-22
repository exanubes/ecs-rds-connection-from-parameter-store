import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_TOKEN } from './config.token';
import { config as baseConfig } from './config.default';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly config: typeof baseConfig,
  ) {}

  getDatabaseConfig() {
    return this.config.database;
  }
}
