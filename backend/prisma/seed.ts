import { prisma, fs } from "../src/providers/prisma-client"
import { parse } from "fast-csv"
import { traveler_type } from "@prisma/client"

export interface Ship {
    ship_name: string
    ship_date: Date
    passenger_list: { passengers: string[] }
}

export interface Publication {
    title: string;
    summary: string;
    can_read: boolean;
}

export interface Traveler {
    traveler_name: string;
    traveler_type: "Author" | "Illustrator";
}

export interface PublicationTraveler {
    publication_id: string
    traveler_id: string
}

(async () => await Promise.allSettled([
    (async () => {
        fs.createReadStream(__dirname + "/seed-file/ships.csv")
            .on("error", () => {
                throw new Error("Error occured while parsing ships")
            })
            .pipe(parse({ headers: true }))
            .on("data", async (row: Ship) => {
                await prisma.ships.create({
                    data: {
                        ...row,
                        ship_date: new Date(row.ship_date),
                    }
                })
            })
            .on("end", () => {
                console.log("Ships seeded")
            })
    })(),
    (async () => {
        function parseBoolean(can_read: boolean): boolean {
            return JSON.stringify(can_read) === "true" ? true : false
        }
        fs.createReadStream(__dirname + "/seed-file/publications.csv")
            .on("error", () => {
                throw new Error("Error occured while parsing publications")
            })
            .pipe(parse({ headers: true }))
            .on("data", async (row: Publication) => {
                await prisma.publication.create({
                    data: {
                        ...row,
                        can_read: parseBoolean(row.can_read),
                    }
                })
            })
            .on("end", async () => {
                console.log("Publications seeded")
            })
    })(),
    (async () => {
        fs.createReadStream(__dirname + "/seed-file/travelers.csv")
            .on("error", (error) => {
                throw new Error("Error occured while parsing travelers")
            })
            .pipe(parse({ headers: true }))
            .on("data", async (row: Traveler) => {
                await prisma.traveler.create({
                    data: {
                        ...row,
                        traveler_type: row.traveler_type === "Author" ? traveler_type.AUTHOR : traveler_type.ILLUSTRATOR
                    }
                })
            })
            .on("end", () => {
                console.log("Travelers seeded")
            })
    })(),

]))().then((res) => {
    if (res.every(fsResult => fsResult.status !== "fulfilled")) {
        throw new Error("seed failed in promise")
    }
}).finally(() => {
    // wait for publication to finish seeding
    setTimeout(() => {
        fs.createReadStream(__dirname + "/seed-file/join-publication-traveler.csv")
            .on("error", () => {
                throw new Error("Error occured while parsing publication traveler")
            })
            .pipe(parse({ headers: true }))
            .on("data", async (row: { publication: string, traveler: string }) => {
                const publication = await prisma.publication.findFirst({
                    where: {
                        title: row.publication
                    }
                })

                const traveler = await prisma.traveler.findFirst({
                    where: {
                        traveler_name: row.traveler
                    }
                })

                if (publication && traveler) {
                    await prisma.publication_traveler.create({
                        data: {
                            publication_id: publication.id,
                            traveler_id: traveler.id
                        }
                    })
                }
            })
            .on("end", () => {
                console.log("PublicationTraveler seeded")
            })
    }, 8000)
    // cannot clear timeout, or else it runs immediately
})
