import { prisma, fs, fastcsv } from "../src/prisma-client"
import csvParser from "csv-parser"
import { parse } from "fast-csv"

interface Ship {
    ship_name: string
    ship_date: Date
    passenger_list: { passengers: string[] }
}

let count = 0;

fs.createReadStream(__dirname + "/seed-file/ships.csv")
    .on("error", () => {
        throw new Error("Error occured while parsing ships")
    })
    .pipe(parse({ headers: true }))
    .on("data", async (row: Ship) => {
        await prisma.ships.create({
            data: {
                ...row,
                ship_date: new Date(row.ship_date)
            }
        })
    })
    .on("end", () => {
        console.log(count)
        console.log("Ships seeded")
    })