import { Context } from "koa";
import Router from "koa-router";

const router = new Router()

router.get('/ping', async (ctx: Context) => {
	try {
		ctx.status = 200

		ctx.body = {
			status: 'success',
			data: 'pong'
		}
	} catch (error) {
		ctx.body = {
			status: 'error',
			error: error
		}
	}
})

export default router