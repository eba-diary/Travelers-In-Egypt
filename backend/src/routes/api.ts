import { Context } from "koa";
import Router from "koa-router";
import { dbRouter } from './api/db'

const router = new Router()

router.use('/api/v1/db', dbRouter.routes())

router.get('/', async (ctx: Context) => {
    try {
        ctx.status = 200
        ctx.body = {
            "api_version": 1
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router