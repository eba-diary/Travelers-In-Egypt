import { Inject, Injectable } from '@nestjs/common';
import { Ship } from './ships/ships.model';
import { ShipsService } from './ships/ships.service';

@Injectable()
export class DbService {
    @Inject(ShipsService)
    private readonly shipsService: ShipsService

    public async getAllShips(): Promise<{ ship: Ship[] }> {
        return { ship: await this.shipsService.getAllShips() }
    }
}
