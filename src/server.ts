import Config from "./config.ts";
import { Application } from "../deps.ts";
import { make } from "./routes.ts";

const Server = (config: Config = {}) => {
  const _default: Config = {
    host: "localhost",
    port: 8080,
    type: "rest",
  };
  const { host, port, path, type } = { ..._default, ...config };
  const router = make({ path, type });

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  return {
    host,
    port,
    serve: async (): Promise<void> => await app.listen(`${host}:${port}`),
  };
};

export default Server;
