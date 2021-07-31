import CreateController from './controllers/rest/create.controller.ts'
import DeleteController from './controllers/rest/delete.controller.ts'
import ReadController from './controllers/rest/read.controller.ts'
import UpdateController from './controllers/rest/update.controller.ts'
import { Context, Router as OakRouter } from './deps.ts'
import Handler from './exceptions/handler.ts'

export const graphql = (router: OakRouter) => (path: string): OakRouter => router.post(
  path,
  async (ctx: Context): Promise<void> => {
    ctx.response.body = 'GraphQL'
  },
)

export const rest = (router: OakRouter) => (path: string): OakRouter => router
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

