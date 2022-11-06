import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
import type { BPAppAPIConfig } from '../app/app.config';

const localAppAPIConfig: BPAppAPIConfig = {
  PORT: 8080,
  HOST_NAME: location.hostname,
  PROTOCOL: 'http:',
  API_ADDRESS: '/api',
  API_VERSION: '/1',
};

export const environment = {
  production: false,
  config: localAppAPIConfig,
};
