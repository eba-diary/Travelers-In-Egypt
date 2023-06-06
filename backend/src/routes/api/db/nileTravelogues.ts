import { Context } from "koa";
import Router from "koa-router";
import { Travelogues } from "../../../providers/travelogues.provider";
import { CustomProviderError, Travelogue } from "../../../types/interface";

const router = new Router()

router.get('/', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb) as Travelogues

    try {
        const traveloguesAndAuthors = await traveloguesProvider.getAllTraveloguesAndPublications()
        ctx.status = 200
        ctx.body = traveloguesAndAuthors
    } catch (error) {
        throw new Error(`${error}`)
    }
})

router.get('/publications', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb) as Travelogues
    try {
        const travelogues: Travelogue[] | CustomProviderError = await traveloguesProvider.getAllTravelogues()
        ctx.status = 200
        ctx.body = travelogues
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router