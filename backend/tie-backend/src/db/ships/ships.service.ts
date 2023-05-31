import { Injectable } from '@nestjs/common';
import { Ship } from './ships.model';
import { ShipsRepository } from './ships.repository';

@Injectable()
export class ShipsService {
    constructor(private readonly shipsRepository: ShipsRepository) { }

    public async getAllShips(): Promise<Ship[]> {
        return await this.shipsRepository.getAllShips()
    }
}
