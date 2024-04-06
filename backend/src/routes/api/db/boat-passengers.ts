import { ships } from "@prisma/client";
import Router from "koa-router";
import { handleRoute } from "../../../lib/handleRoute";
import { prisma } from "../../../providers/prisma-client";
import { ApiRoute } from "../../../types/api";
import { Ship } from "../../../types/interface";

const boatPassengersRouter = new Router()

const boatPassengers: ApiRoute<void, ships[]> = async (ctx) => {
	try {
		const data = await prisma.ships.findMany({})
		if (!data) {
			ctx.throw(400, "Failed to fetch ships")
		}
		ctx.status = 200
		ctx.body = data
	} catch (error) {
		ctx.throw(error as Error)
	}
}

boatPassengersRouter.get('/', handleRoute(boatPassengers))

export { boatPassengersRouter }