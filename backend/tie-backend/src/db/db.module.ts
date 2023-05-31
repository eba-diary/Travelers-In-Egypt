import { Module } from "@nestjs/common";
import { DbController } from "./db.controller";
import { DbService } from "./db.service";
import { ShipsModule } from "./ships/ships.module";

@Module({
    imports: [ShipsModule],
    controllers: [DbController],
    providers: [DbService]
})

export class DbModule { }