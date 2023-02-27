import { env } from "../env/server.mjs";
import pino from "pino";

const token = env.LOGTAIL_TOKEN;
// const transport = pino.transport({
//   target: "@logtail/pino",
//   options: { sourceToken: token },
// });

// export const logger = pino(transport);

// const logLevel = (env.PINO_LOG_LEVEL as string) ?? "info";
// const pinoConfig = {
//   name: "hypothetical-books",
//   level: logLevel,
// };
//
// const logger = pino(pinoConfig);
// export const log = (msg: string) => logger.info(msg);
// export default logger;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const transport = pino.transport({
  target: "@logtail/pino",
  options: { sourceToken: token },
});
const logger = pino(transport);
export default logger;
