import { Context } from "koa";
import Router from "koa-router";
import { Travelogues } from "../../../providers/travelogues.provider";
import { CustomProviderError, Publications, Traveler, Travelogue } from "../../../types/interface";

const traveloguesRouter = new Router()

traveloguesRouter.get('/', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb)

    try {
        const traveloguesAndAuthors: Travelogue[] | CustomProviderError = await traveloguesProvider.getAllTraveloguesAndPublications()

        if (traveloguesAndAuthors instanceof Array) {
            const publicationsMap = new Map<string, { id: number, Publications: Publications, Travelers: Traveler[] }>()
            traveloguesAndAuthors.forEach((travelogue) => {
                const publication: Publications = travelogue.Publications
                const publicationTitle = publication.title

                if (!publicationsMap.has(publicationTitle)) {
                    publicationsMap.set(publicationTitle, {
                        id: publication.publications_id,
                        Publications: { ...publication },
                        Travelers: [{ ...travelogue.Travelers }]
                    })
                } else {
                    const existingPublication = publicationsMap.get(publicationTitle)
                    existingPublication!.Travelers.push({ ...travelogue.Travelers })
                }
            })

            const reshapedData = Array.from(publicationsMap.values()).map((travelogue) => {
                const trimmedTitle = travelogue.Publications.title.trim()
                const canReadSymbol = travelogue.Publications.can_read ? '✅' : '❌'
                return {
                    ...travelogue,
                    Travelers: {
                        info: [...travelogue.Travelers],
                        travelers_name: travelogue.Travelers.map((entry) => entry.travelers_name)
                    },
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

traveloguesRouter.get('/publications', async (ctx: Context) => {
    const traveloguesProvider = new Travelogues(ctx.sb) as Travelogues
    try {
        const travelogues: Publications[] | CustomProviderError = await traveloguesProvider.getAllTravelogues()
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

export { traveloguesRouter }