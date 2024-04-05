import { type Context } from 'koa'
import Router from 'koa-router'
import { boatPassengersRouter } from './db/boat-passengers'
import { traveloguesRouter } from './db/nile-travelogues'

const dbRouter = new Router()

dbRouter.get('/', async (ctx: Context) => {
	ctx.status = 200
  ctx.body = {
		db_version: 'v1'
	};
})

dbRouter.use('/ships', boatPassengersRouter.routes())
dbRouter.use('/travelogues', traveloguesRouter.routes())
export { dbRouter };
