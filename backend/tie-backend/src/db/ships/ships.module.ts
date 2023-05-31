import { Module } from "@nestjs/common";
import { ShipsController } from "./ships.controller";
import { ShipsRepository } from "./ships.repository";
import { ShipsService } from "./ships.service";

@Module({
    controllers: [ShipsController],
    providers: [ShipsService, ShipsRepository],
    exports: [ShipsService, ShipsRepository]
})

export class ShipsModule { }