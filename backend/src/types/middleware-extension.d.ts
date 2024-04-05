import { SupabaseService } from "../supabase/supabase.service";

declare module "koa" {
	interface BaseContext {
		sb: SupabaseService;
	}

	interface Context extends BaseContext { }
}
