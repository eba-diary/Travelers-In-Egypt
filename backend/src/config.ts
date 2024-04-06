import { type IConfig } from './types/interface'

export const config: IConfig = {
  meta: {
    port: process.env.PORT || '8080'
	},
  redis: {
    socket: {
      host: process.env.REDIS__HOST || '0.0.0.0',
      port: process.env.REDIS__PORT && parseInt(process.env.REDIS__PORT) || 6379
    }
  }
};
