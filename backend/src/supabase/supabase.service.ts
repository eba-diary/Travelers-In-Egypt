import { SupabaseClient, createClient, AuthResponse, Provider } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { SignInRequestBody } from '../routes/api/auth/sign-in';

dotenv.config()

interface SignInWithOAuth {
	provider: Provider;
	url: string | null;
}

export class SupabaseService {
	private sb?: SupabaseClient;

	constructor() { }

	public getOrCreateClient(): SupabaseClient {
		if (this.sb) {
			return this.sb
		}
		this.sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
		return this.sb
	}

	async signInWithPassword({
		email,
		password
	}: SignInRequestBody): Promise<AuthResponse["data"] | undefined> {
		if (!this.sb) {
			return;
		}
		const { data, error } = await this.sb.auth.signInWithPassword({ email, password });
		if (error) {
			throw error
		};
		const {
			user,
			session
		} = data;

		return { user, session };
	}

	async signInWithGoogle(): Promise<SignInWithOAuth | undefined> {
		if (!this.sb) {
			return;
		}
		const { data, error } = await this.sb.auth.signInWithOAuth({
			provider: "google"
		});

		if (error) {
			throw error;
		}

		const { provider, url } = data;

		return { provider, url };
	}

	/** TODO: enumerate status codes  */
	async signOut(): Promise<200 | undefined> {
		if (!this.sb) {
			return;
		}
		const { error } = await this.sb.auth.signOut();
		if (error) {
			throw error
		};

		return 200;
	}
}