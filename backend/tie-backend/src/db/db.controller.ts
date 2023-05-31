import { Controller, Get, Inject } from "@nestjs/common";
import { DbService } from "./db.service";
import { ShipsService } from "./ships/ships.service";


@Controller('db')

export class DbController {
    constructor(
        @Inject(DbService)
        private readonly service: DbService
    ) { }

    @Get('ships')
    public async getAllShips() {
        return await this.service.getAllShips()
    }
}