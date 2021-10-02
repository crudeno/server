import Config from './config.ts'
import CreateController from './controllers/rest/create.controller.ts'
import DeleteController from './controllers/rest/delete.controller.ts'
import ReadController from './controllers/rest/read.controller.ts'
import UpdateController from './controllers/rest/update.controller.ts'
import { Context, Router as OakRouter } from '../deps.ts'
import Handler from './exceptions/handler.ts'

const trim = (path: string): string => `${`${path}`.replace(/^\/*/, '')}`

export const graphql = (path: string): OakRouter => (new OakRouter()).post(
  path,
  async (ctx: Context): Promise<void> => {
    ctx.response.body = 'GraphQL'
  },
)

export const rest = (path: string): OakRouter => (new OakRouter())
  .post(path, Handler, CreateController)
  .get(path, Handler, ReadController)
  .get(`${path}/:id`, Handler, ReadController)
  .put(`${path}/:id`, Handler, UpdateController)
  .patch(`${path}/:id`, Handler, UpdateController)
  .delete(`${path}/:id`, Handler, DeleteController)

export const notFound = (router: OakRouter) => router.all(
  '(.*)',
  async (ctx: Context): Promise<void> => {
    ctx.response.status = 404
    ctx.response.body = {
      error: {
        message: 'The resource you are looking for does not exist',
        status: 404,
      },
    }
  })

export const make = ({ path, type }: Config): OakRouter => {
  let router: OakRouter
  switch (type) {
    case 'graphql':
      router = graphql(`/${trim(path || 'graphql')}`)
      break

    case 'rest':
    default:
      router = rest(`/${trim(path || '')}`)
      break
  }

  return notFound(router)
}
