import { Context } from "koa";
import Router from "koa-router";
import { ShipProvider } from "../../../providers/ship.provider";
import { SupabaseService } from "../../../service/supabase.service";
import { CustomProviderError, Ship } from "../../../types/interface";

const router = new Router()

router.get('/', async (ctx: Context) => {
    const shipProvider = new ShipProvider(ctx.sb)
    try {
        const ships: Ship[] | CustomProviderError = await shipProvider.getAllShips()
        ctx.status = 200
        ctx.body = ships
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router