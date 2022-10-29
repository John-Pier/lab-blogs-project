/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
import type { BPAppAPIConfig } from '../app/app.config';

const localAppAPIConfig: BPAppAPIConfig = {
  PORT: 8080,
  HOST_NAME: location.hostname,
  PROTOCOL: 'http:',
  API_ADDRESS: '/api',
  API_VERSION: 1.0,
};

export const environment = {
  production: false,
  config: localAppAPIConfig,
};
