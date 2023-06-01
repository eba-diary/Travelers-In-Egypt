import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/supabase/supabase.module";
import { ShipsController } from "./ships.controller";
import { ShipsRepository } from "./ships.repository";
import { ShipsService } from "./ships.service";

@Module({
    imports: [SupabaseModule],
    controllers: [ShipsController],
    providers: [ShipsService, ShipsRepository],
    exports: [ShipsService, ShipsRepository],
})

export class ShipsModule { }