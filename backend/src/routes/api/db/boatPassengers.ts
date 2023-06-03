import { Context } from "koa";
import Router from "koa-router";
import { ShipProvider } from "../../../providers/ship.provider";
import { SupabaseService } from "../../../supabase/supabase.service";

const router = new Router()
const sb = new SupabaseService()
const shipProvider = new ShipProvider(sb)

router.get('/', async (ctx: Context) => {
    try {
        const ships = await shipProvider.getAllShips()
        ctx.status = 200
        ctx.body = ships
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export default router