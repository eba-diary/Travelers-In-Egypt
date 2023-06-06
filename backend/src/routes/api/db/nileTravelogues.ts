import { Context } from "koa";
import Router from "koa-router";
import { Travelogues } from "../../../providers/travelogues.provider";
import { CustomProviderError, Publication, Travelogue } from "../../../types/interface";

const router = new Router()

router.get('/', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb) as Travelogues

    try {
        const traveloguesAndAuthors: Travelogue[] | CustomProviderError = await traveloguesProvider.getAllTraveloguesAndPublications()

        if (traveloguesAndAuthors instanceof Array) {
            const reshapedData = traveloguesAndAuthors.map((travelogue) => {
                const trimmedTitle = travelogue.Publications.title.trim()
                const canReadSymbol = travelogue.Publications.can_read ? '✅' : '❌'
                return {
                    ...travelogue,
                    Publications: {
                        ...travelogue.Publications,
                        title: trimmedTitle,
                        can_read: canReadSymbol
                    }
                }
            })
            ctx.status = 200
            ctx.body = reshapedData
        } else {
            ctx.status = 400
            ctx.body = {
                status: 'failure',
                error: {
                    message: 'Bad Request. Try a different request.'
                }
            } as CustomProviderError
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
})

router.get('/publications', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb) as Travelogues
    try {
        const travelogues: Publication[] | CustomProviderError = await traveloguesProvider.getAllTravelogues()
        if (travelogues instanceof Array) {
            ctx.status = 200
            ctx.body = travelogues
        } else {
            ctx.status = 400
            ctx.body = {
                status: 'failure',
                error: {
                    message: 'Bad Request. Try a different request.'
                }
            } as CustomProviderError
        }
        ctx.status = 200
        ctx.body = travelogues
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router