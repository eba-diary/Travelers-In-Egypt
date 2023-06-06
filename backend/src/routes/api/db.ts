import { Context } from "koa";
import Router from "koa-router";
import boatPassengersRouter from './db/boatPassengers'
import traveloguesRouter from './db/nileTravelogues'

const router = new Router()

router.get('/', async (ctx: Context) => {
    ctx.status = 200
    ctx.body = {
        db_version: 'v1'
    }
})

router.use('/ships', boatPassengersRouter.routes())
router.use('/travelogues', traveloguesRouter.routes())
export default router