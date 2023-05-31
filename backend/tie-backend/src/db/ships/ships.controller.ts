import { Controller, Get } from "@nestjs/common";
import { Ship } from "./ships.model";
import { ShipsService } from "./ships.service";

@Controller('ships')

export class ShipsController {
    constructor(private readonly ships: ShipsService) { }

    @Get()
    public async getAllShips(): Promise<Ship[]> {
        return await this.ships.getAllShips()
    }
}