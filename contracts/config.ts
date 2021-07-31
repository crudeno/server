export default interface Config {
  entity?: string;
  host?: string;
  port?: string;
  prefix?: string;
  type?: 'graphql' | 'rest';
}
