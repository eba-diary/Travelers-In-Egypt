import { Context } from "koa";
import Router from "koa-router";
import boatPassengersRouter from './db/boatPassengers'

const router = new Router()

router.get('/', async (ctx: Context) => {
    ctx.status = 200
    ctx.body = {
        db_version: 'v1'
    }
})

router.use('/ships', boatPassengersRouter.routes())
export default router