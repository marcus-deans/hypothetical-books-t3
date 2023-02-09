import pino from "pino";

export const logger = pino({
  name: "hypothetical-books",
  level: "debug",
});
