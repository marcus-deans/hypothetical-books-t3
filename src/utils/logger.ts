import { env } from "../env/server.mjs";
import pino from "pino";

const token = "xkFjXhGnek18wmxrc4WNaRPH";
// const transport = pino.transport({
//   target: "@logtail/pino",
//   options: { sourceToken: token },
// });
// export const logger = pino(transport);

const logLevel = (env.PINO_LOG_LEVEL as string) ?? "info";
const pinoConfig = {
  name: "hypothetical-books",
  level: logLevel,
};

const logger = pino(pinoConfig);
export const log = (msg: string) => logger.info(msg);
export default logger;
