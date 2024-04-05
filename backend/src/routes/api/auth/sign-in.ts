import { DefaultContext, ParameterizedContext } from "koa";
import Router from "koa-router";
import { handleRoute } from "../../../lib/handleRoute";
import { ApiRoute } from "../../../types/api";

const authRouter = new Router();

export interface SignInRequestBody {
	email: string;
	password: string;
}

const signIn: ApiRoute<SignInRequestBody, any> = async (ctx) => {
	const { email, password } = ctx.request.body;
	try {
		const data = await ctx.sb.signInWithPassword({ email, password });
		ctx.status = 200;
		ctx.body = { message: "Sign-in successful", data };
	} catch (error) {
		ctx.status = 400;
		ctx.body = { error: `Failed to sign in: ${error}` };
	}
};


authRouter.post('/signin', handleRoute<SignInRequestBody, any>(signIn));

authRouter.post("/test", async () => {

})

export { authRouter };
