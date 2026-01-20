
import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

const main = async () => {
  app.listen(config.port, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });
}

main();
