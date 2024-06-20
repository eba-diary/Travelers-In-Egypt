import Logger from "bunyan";
import { SupabaseService } from "../supabase/supabase.service";

declare module "koa" {
	interface BaseContext {
		sb: SupabaseService;
		log: Logger
	}

	interface Context extends BaseContext { }
}
