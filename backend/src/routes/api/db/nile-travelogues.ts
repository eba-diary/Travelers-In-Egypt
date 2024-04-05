import { type Context } from 'koa'
import Router from 'koa-router'
import { prisma } from '../../../providers/prisma-client'
import { Travelogues } from '../../../providers/travelogues.provider'
import { CustomProviderError, Publications, Traveler, Travelogue } from '../../../types/interface'

const traveloguesRouter = new Router()

traveloguesRouter.get('/', async (ctx: Context) => {
  try {
    const data = await prisma.publication.findMany({
      include: {
        publication_traveler: {
          include: {
            traveler: true
          }
        }
      }
    })
		if (!data) {
      throw new Error('publication to traveler linking threw an error')
		}
    ctx.status = 200
		ctx.body = data
	} catch (error) {
    throw new Error(`${error}`)
	}
})

traveloguesRouter.get('/publications', async (ctx: Context) => {
  try {
    const data = await prisma.publication.findMany()
		if (!data) {
      throw new Error('getting all publications failed')
		}
    ctx.status = 200
		ctx.body = data
	} catch (error) {
    throw new Error(`${error}`)
	}
})

export { traveloguesRouter };
