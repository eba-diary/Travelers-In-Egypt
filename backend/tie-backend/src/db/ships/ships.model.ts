interface Passenger {
    passenger: string[]
}

export class Ship {
    constructor(
        public id: number,
        public ship_name: string,
        public ship_date: Date,
        public passenger_list: Passenger
    ) { }
}