import Router from "koa-router";
import { prisma } from "../../../providers/prisma-client";

const boatPassengersRouter = new Router()

boatPassengersRouter.get('/', async (ctx) => {
	const data = await prisma.ships.findMany()
	if (!data) {
		ctx.status = 400
		throw new Error("Failed to fetch ships")
	}
	ctx.status = 200
	ctx.body = data
})

export { boatPassengersRouter }