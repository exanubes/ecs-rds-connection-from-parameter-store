import {
  SSMClient,
  Parameter,
  GetParametersByPathCommand,
} from '@aws-sdk/client-ssm';
import { CONFIG_TOKEN } from './config.token';
import { set } from 'lodash';
import { config } from './config.default';

export const configProvider = {
  provide: CONFIG_TOKEN,
  async useFactory(): Promise<typeof config> {
    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
      return config;
    }
    const client = new SSMClient({});
    const command = new GetParametersByPathCommand({
      Path: '/production',
      Recursive: true,
      WithDecryption: true,
    });
    const result = await client.send(command);
    return transformParametersIntoConfig(result.Parameters || []);
  },
};

function transformParametersIntoConfig(params: Parameter[]): any {
  return params.reduce((config: any, param: any) => {
    const path = param.Name.substring(1)
      .replace(/\//g, '.')
      .split('.')
      .splice(1)
      .join('.');
    return set(config, path, param.Value);
  }, {});
}
