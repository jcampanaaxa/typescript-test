import * as pino from 'amf-logger';

export class AMFLogger implements Logger.LogInterface {
  readonly currentLevel: Logger.LogLevel;
  private logger: any;

  constructor(
    name: string,
    level: Logger.LogLevel = Logger.LogLevel.warning,
    prettyPrint: boolean = false
  ) {
    const pinoOptions = {
      level,
      name,
      prettyPrint
    };

    this.currentLevel = level;
    this.logger = pino(pinoOptions);
  }

  log(message: string) {
    this.logger.log(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
  info(message: string) {
    this.logger.info(message);
  }
}
