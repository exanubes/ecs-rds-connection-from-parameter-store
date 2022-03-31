import {
  SSMClient,
  Parameter,
  GetParametersByPathCommand,
} from '@aws-sdk/client-ssm';
import { set } from 'lodash';
import { config } from './config.default';

export const getConfig = async () => {
  const isProd = process.env.NODE_ENV === 'production';
  console.log('isProd: ', isProd);
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
