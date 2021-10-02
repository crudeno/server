import Config from './config.ts'
import { Application } from '../deps.ts'
import { make } from './routes.ts'

const Server = (config: Config) => {
  const app = new Application()
  const host = config.host || 'localhost'
  const port = config.port || 8000
  const router = make(config)

  app.use(router.routes())
  app.use(router.allowedMethods())

  return {
    host,
    port,
    serve: async (): Promise<void> => await app.listen(`${host}:${port}`),
  }
}

export default Server
