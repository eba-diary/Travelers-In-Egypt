import { Stack } from "@chakra-ui/react";
import { Table } from "../../../lib/types";
import TableView from "./tableView";

export interface ShipTable extends Table {
    rows: {
        id: number
        ship_name: string
        ship_date: Date,
        passenger_list: Passenger
    }[]
}

interface Passenger {
    passenger: string[]
}

interface Props {
    data: ShipTable
}

export default function BoatPassengersDataViews({ data }: Props) {
    const columns = [
        {
            Header: 'Name',
            accessor: 'ship_name'
        },
        {
            Header: 'Date',
            accessor: 'ship_date'
        },
        {
            Header: 'List',
            accessor: 'passenger_list'
        }
    ]

    return (
        <Stack>
            <TableView data={data} columns={columns} />
        </Stack>
    )
}