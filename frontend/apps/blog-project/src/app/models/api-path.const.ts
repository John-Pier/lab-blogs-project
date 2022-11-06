import { environment } from '../../environments/environment';

const config = environment.config;

export const API_PATH = `${config.PROTOCOL}//${config.HOST_NAME}:${config.PORT}${config.API_ADDRESS}/v/n${config.API_VERSION}`;
