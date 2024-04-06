import Router from "koa-router";
import { handleRoute } from "../lib/handleRoute";
import { ApiRoute } from "../types/api";
import { dbRouter } from './api/db'

const router = new Router()

interface ApiVersion {
	api_version: number
}

const handleApi: ApiRoute<void, ApiVersion> = async ({ status, body, throw: throwError }) => {
	try {
		status = 200
		body = {
			"api_version": 1
		}
	} catch (error) {
		throwError(500, "Error getting api version", {})
	}
}

router.get('/', handleRoute(handleApi))

router.use('/api/v1/db', dbRouter.routes())
export default router
