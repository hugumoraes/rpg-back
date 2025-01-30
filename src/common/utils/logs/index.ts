/* ---------- External ---------- */
import { config } from 'dotenv';
import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import cj, { Colors } from 'color-json';

config();

const {
  combine,
  timestamp: format_timestamp,
  printf,
  label: format_label,
} = format;

const { LOGLEVEL, LOGNAME } = process.env;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const customColors: Colors = {
  boolean: 'magenta',
  key: 'cyan',
  null: 'cyan',
  number: 'blue',
  separator: 'white',
  string: 'yellow',
};

const customColorMap = {
  black: '\x1b[38;2;40;42;54m', // Dracula Background (#282A36)
  red: '\x1b[38;2;255;85;85m', // Dracula Red (#FF5555)
  green: '\x1b[38;2;80;250;123m', // Dracula Green (#50FA7B)
  yellow: '\x1b[38;2;241;250;140m', // Dracula Yellow (#F1FA8C)
  blue: '\x1b[38;2;139;233;253m', // Dracula Blue (#8BE9FD)
  magenta: '\x1b[38;2;189;147;249m', // Dracula Purple (#BD93F9)
  cyan: '\x1b[38;2;255;121;198m', // Dracula Pink (#FF79C6)
  white: '\x1b[38;2;248;248;242m', // Dracula Foreground (#F8F8F2)
};

const console_format = printf(({ level, message, timestamp, label }) => {
  const level_uppercase = level.toUpperCase();
  const untouchedMessage = message;

  let typedTimestamp = timestamp as string | number;

  const timestamp_time = `${new Date(typedTimestamp).toLocaleTimeString(
    'it-US',
  )}.${new Date(typedTimestamp).getMilliseconds()}ms`;

  label = chalk.black.bgCyanBright.bold(` ${label} `);
  typedTimestamp = chalk.black.bgWhiteBright(` ${timestamp_time} `);

  switch (level_uppercase) {
    case 'INFO':
      message = chalk.greenBright(message);
      level = chalk.black.bgGreenBright.bold(` ${level_uppercase} `);
      break;

    case 'WARN':
      message = chalk.yellowBright(message);
      level = chalk.black.bgYellowBright.bold(` ${level_uppercase} `);
      break;

    case 'ERROR':
      message = chalk.redBright(message);
      level = chalk.black.bgRedBright.bold(` ${level_uppercase} `);
      break;

    case 'DEBUG':
      message = chalk.blueBright(message);
      level = chalk.black.bgBlueBright.bold(` ${level_uppercase} `);
      break;

    default:
      break;
  }

  if (typeof untouchedMessage === 'object') {
    const stringifiedMessage = JSON.stringify(untouchedMessage, null, 4);

    return `${label}${typedTimestamp}${level}: \n${cj(
      stringifiedMessage,
      customColors,
      customColorMap,
    )}`;
  }

  return `${label}${typedTimestamp}${level}: ${message}`;
});

const file_format = printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`;
});

export const logger = createLogger({
  format: combine(
    format_label({ label: LOGNAME }),
    format_timestamp(),
    format.splat(),
    console_format,
  ),
  levels,
  transports: [
    new transports.Console({ level: LOGLEVEL ?? 'info' }),
    new transports.File({
      level: 'info',
      filename: 'logs/output.log',
      format: combine(
        format_label({ label: LOGNAME }),
        format_timestamp(),
        format.splat(),
        file_format,
      ),
    }),
  ],
});
