import Koa, { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import KoaLogger from 'koa-logger'
import { config } from './config'
import apiRouter from './routes/api'
import healthCheckRouter from './routes/healthcheck'
import bunyan from 'bunyan'
import { SupabaseService } from './supabase/supabase.service'

const app = new Koa()
const PORT = config.meta.port
const APP_NAME = "Travelers In Egypt Backend"

app.use(bodyParser())

app.use(
	cors({
		origin: '*'
	})
);

app.use(KoaLogger())

const log = bunyan.createLogger({ name: APP_NAME })
log.info("Travelers in Egypt back-end entry point")
const sb = new SupabaseService()

/** add sb to context */
app.context.sb = sb
app.context.log = log
app.context.healthCheckRouter = healthCheckRouter
app.context.apiRouter = apiRouter

app.use(async (ctx, next) => {
	/** apply and use the context */
	ctx.sb = sb
	log.info("Supabase service established")
	await next()
});

app.use(async (ctx, next) => {
	ctx.log = log
	log.info("Added log to context")
	await next()
})

app.use(healthCheckRouter.routes())
app.use(async (ctx, next) => {
	ctx.healthCheckRouter = healthCheckRouter
	log.info("Health Check Router")
	await next()
})

app.use(apiRouter.routes())
app.use(async (ctx, next) => {
	ctx.apiRouter = apiRouter
	log.info("API Router")
	await next()
})

const server = app.listen(
	PORT, async () => {
		console.log(`Server listening on port ${PORT}`)
	}
).on('error', error => {
	console.log(error)
})

export default server;
