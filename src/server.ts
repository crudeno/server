import Config from "./config.ts";
import { Application } from "../deps.ts";
import { make } from "./routes.ts";

const Server = ({ port, path, type }: Config) => {
  const router = make({ path, type });

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  return {
    port,
    serve: async (): Promise<void> => await app.listen({ port }),
  };
};

export default Server;
