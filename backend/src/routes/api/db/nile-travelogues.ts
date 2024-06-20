import { Prisma, publication, traveler, traveler_type } from "@prisma/client";
import Router from "koa-router";
import { handleRoute } from "../../../lib/handleRoute";
import { prisma } from "../../../providers/prisma-client";
import { ApiRoute } from "../../../types/api";
``

const traveloguesRouter = new Router()

interface Travelogue {
	id: string;
	publication_traveler: {
		id: string;
		publication_id: string;
		traveler_id: string;
		traveler: traveler,
	}[];
};


const getTravelogues: ApiRoute<void, Travelogue[]> = async (ctx) => {
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
		ctx.throw(400, "publication to traveler linking threw an error");
	}
	ctx.status = 200
	ctx.body = data
}

const getPublications: ApiRoute<void, publication[]> = async (ctx) => {
	const data = await prisma.publication.findMany()
	if (!data) {
		ctx.throw(400, "getting all publications failed");
	}
	ctx.status = 200
	ctx.body = data
}

traveloguesRouter.get('/', handleRoute(getTravelogues))
traveloguesRouter.get('/publications', handleRoute(getPublications))

export { traveloguesRouter }
