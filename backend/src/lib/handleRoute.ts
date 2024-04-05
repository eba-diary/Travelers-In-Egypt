import Koa, { DefaultState, DefaultContext, ParameterizedContext } from 'koa';

export const handleRoute = <ReqBody, ResBody>(
	handler: (
		ctx: ParameterizedContext<
			DefaultState,
			DefaultContext & { request: { body: ReqBody } },
			ResBody
		>
	) => Promise<void>
) => {
	return async (
		ctx: ParameterizedContext<
			DefaultState,
			DefaultContext & { request: { body?: ReqBody | unknown } },
			ResBody
		>
	) => {
		/** TODO implement logging here. Shared api function */
		if (ctx.request.body && !((ctx.request.body as any) satisfies ReqBody)) {
			ctx.status = 400
			ctx.throw(400);
		}
		await handler(ctx as any)
	};
}
