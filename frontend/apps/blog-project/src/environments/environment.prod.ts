import type { BPAppAPIConfig } from '../app/app.config';

const deployAppAPIConfig: BPAppAPIConfig = {
  PORT: location.port,
  HOST_NAME: location.hostname,
  PROTOCOL: location.protocol,
  API_ADDRESS: '/api/v/n/',
  API_VERSION: 1.0,
};

export const environment = {
  production: true,
  config: deployAppAPIConfig,
};
