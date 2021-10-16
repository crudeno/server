type Config = {
  readonly port: number;
  readonly path?: string;
  readonly type: "graphql" | "rest";
};

export default Config;
