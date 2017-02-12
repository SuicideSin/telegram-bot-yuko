import winston, {Logger, transports} from 'winston';

const {
  Console,
} = transports;

global.logger = new Logger({
  levels: {
    error: 0,
    warn: 1,
    status: 2,
    command: 3,
    event: 4,
    info: 5,
  },
  transports: [
    new Console({
      level: 'warn',
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
    }),
  ],
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  status: 'blue',
  command: 'cyan',
  event: 'magenta',
  info: 'green',
});
