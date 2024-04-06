import Router from "koa-router";
import { handleRoute } from "../../lib/handleRoute";
import { ApiRoute } from "../../types/api";
import { boatPassengersRouter } from './db/boat-passengers'
import { traveloguesRouter } from './db/nile-travelogues'

const dbRouter = new Router()

interface DatabaseVersion {
	db_version: `v${number}`
}

const db: ApiRoute<void, DatabaseVersion> = async (ctx) => {
	ctx.status = 200
	ctx.body = {
		db_version: 'v1'
	}
}

dbRouter.get('/', handleRoute(db))

dbRouter.use('/ships', boatPassengersRouter.routes())
dbRouter.use('/travelogues', traveloguesRouter.routes())
export { dbRouter };
