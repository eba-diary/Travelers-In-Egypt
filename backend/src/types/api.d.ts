import { DefaultContext, DefaultState, ParameterizedContext, Request } from 'koa';

type ApiRoute<ReqBody, ResBody> = (
	ctx: ParameterizedContext<
		DefaultState,
		DefaultContext
		& {
			request: {
				body: ReqBody
			}
		},
		ResBody
	>
) => Promise<void>;