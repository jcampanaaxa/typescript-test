namespace Logger {
  export enum LogLevel {
    warning = 'warn',
    error = 'error',
    debug = 'debug',
    info = 'info',
    all = '*',
    none = 'none'
  }

  export interface LogInterface {
    readonly currentLevel: LogLevel;

    log(message: string);
    debug(message: string);
    warn(message: string);
    error(message: string);
    info(message: string);
  }
}
