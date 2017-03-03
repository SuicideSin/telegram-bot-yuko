import winston, {Logger, transports} from 'winston';

const {
  Console,
} = transports;

global.logger = new Logger({
  levels: {
    error: 0,
    warn: 1,
    command: 2,
    event: 3,
    status: 4,
    info: 5,
  },
  transports: [
    new Console({
      level: 'status',
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
  command: 'cyan',
  event: 'magenta',
  status: 'blue',
  info: 'green',
});
