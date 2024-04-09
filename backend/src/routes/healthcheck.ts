import { Context } from "koa";
import Router from "koa-router";
import { handleRoute } from "../lib/handleRoute";
import { ApiRoute } from "../types/api";

const router = new Router()

interface HealthCheck {
	data: "pong"
}

const healthCheck: ApiRoute<void, HealthCheck> = async ({ status, body, throw: throwError }) => {
	try {
		status = 200
		body = {
			data: "pong"
		}
	} catch (error) {
		throwError(500, "Systems are unhealthy")
	}
}

router.get("/ping", handleRoute(healthCheck))

export default router