import { EnvService } from './env.service';
import { browser } from 'protractor';

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService();

  // Read environment variables  from browser window
  const browserWindow = window || {};
 
  // const windowKeys: string[] = Object.keys(browserWindow);

  // const browserWindowEnv = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js
  // If needed, a deep merge can be performed
  for (const key in browserWindow) {
    if (browserWindow.hasOwnProperty(key)) {
      if (key === 'apiUrl') {
        env.apiUrl = (browserWindow as any).apiUrl;
      }
      if (key === 'enableDebug') {
        env.enableDebug = (browserWindow as any).enableDebug;
      }
      // env[key] = window['__env'][key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
