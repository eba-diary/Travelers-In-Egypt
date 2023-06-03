import Koa, { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import KoaLogger from 'koa-logger'
import { config } from './config'
import apiRouter from './routes/api'
import healthCheckRouter from './routes/healthcheck'

const app = new Koa()
const PORT = config.meta.port

app.use(bodyParser())

app.use(
    cors({
        origin: '*'
    })
)

app.use(KoaLogger())
app.use(healthCheckRouter.routes())
app.use(apiRouter.routes())


const server = app.listen(
    PORT, async () => {
        console.log(`Server listening on port ${PORT}`)
    }
).on('error', error => {
    console.log(error)
})


export default server