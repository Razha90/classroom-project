import winston from "winston";
const { combine, timestamp,colorize, align, printf } = winston.format;

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
  }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: `src/lib/_log/${process.env.FILENAME_LOG || "app.log"}`
    }),
  ],
});

export default logger;
