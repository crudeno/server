import Config from './contracts/config.ts'
import { Application, plural, Router as OakRouter } from './deps.ts'
import { graphql, notFound, rest } from './routes.ts'

export default class Server {
  protected app: Application

  constructor(protected config: Config) {
    const router = this.router(config)
    // this.app.use(TimeElapsed())
    // this.app.use(Logger())
    this.app = new Application()
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }

  async serve(): Promise<void> {
    return await this.app.listen(
      `${this.config.host}:${this.config.port}`,
    )
  }

  protected router(config: Config) {
    let router = new OakRouter()
    switch (config.type) {
      case 'graphql':
        router = graphql(router)('/graphql')
        break

      case 'rest':
        const entity = plural(config.entity ? config.entity.toLowerCase() : '').replaceAll('_', '-')
        const prefix = config.prefix ? config.prefix.toLowerCase() : ''
        router = rest(router)(`/${`${prefix}/${entity}`.replace(/^\/*/, '')}`)
        break
    }

    return notFound(router)
  }
}
