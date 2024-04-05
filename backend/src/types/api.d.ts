import { BaseContext, DefaultContext, DefaultState, ParameterizedContext, Request } from 'koa';

type ApiRoute<ReqBody, ResBody> = (
	ctx: ParameterizedContext<
		DefaultState,
		DefaultContext
		& {
			request: {
				body: ReqBody
			}
		} | any,
		ResBody
	>
) => Promise<void>;