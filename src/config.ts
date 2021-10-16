type Config = {
  readonly host?: string;
  readonly port?: number;
  readonly path?: string;
  readonly type?: "graphql" | "rest";
};

export default Config;
