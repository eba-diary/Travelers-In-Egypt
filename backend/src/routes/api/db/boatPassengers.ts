import { Context } from "koa";
import Router from "koa-router";
import { prisma } from "../../../prisma-client";
import { ShipProvider } from "../../../providers/ship.provider";
import { CustomProviderError, Ship } from "../../../types/interface";

const router = new Router()

router.get('/', async (ctx: Context) => {
    const shipProvider = new ShipProvider(ctx.sb)
    try {
        const ships: Ship[] | CustomProviderError = await shipProvider.getAllShips()
        const data = await prisma.ships.findMany()
        ctx.status = 200
        ctx.body = data
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router