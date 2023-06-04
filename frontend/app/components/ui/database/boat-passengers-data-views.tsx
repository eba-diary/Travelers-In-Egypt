import { Grid, GridItem, HStack, ModalBody, ModalCloseButton, ModalHeader, Stack, Table, Tbody, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { TableProps } from "../../../lib/types";
import TableView from "./tableView";

export interface ShipTable extends TableProps {
    rows: {
        id: number
        ship_name: string
        ship_date: Date,
        passenger_list: Passenger
    }[]
}

interface Passenger {
    passengers: string[]
}

interface Props {
    data: ShipTable
}

export default function BoatPassengersDataViews({ data }: Props) {
    const columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'ship_name'
        },
        {
            Header: 'Date',
            accessor: 'ship_date'
        }
        // {
        //     Header: 'List',
        //     accessor: 'passenger_list',
        // }
    ]

    return (
        <Stack>
            <TableView
                data={{
                    rows: data.rows.map(row => ({
                        id: row.id,
                        ship_name: row.ship_name,
                        ship_date: (new Date(row.ship_date)).toISOString().split('T')[0],
                        passenger_list: row.passenger_list.passengers
                    }))
                }}
                cellAdditionalInfo={data.rows.map(row => row.passenger_list.passengers)}
                columns={columns}
                ModalTemplate={ModalTemplate}
            />
        </Stack>
    )
}

function ModalTemplate({ rowProps, cellAdditionalInfo }: { rowProps: Record<string, any>, cellAdditionalInfo: any[] }) {
    return (
        <React.Fragment>
            <ModalHeader>
                {rowProps.values.ship_name}: {rowProps.values.ship_date}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack borderBottom='1px solid' margin='10px 0px' padding='5px 0px'>
                    <Text fontSize='20px' fontWeight={700}>Passengers</Text>
                </Stack>
                <Table>
                    <Tbody>
                        {
                            Array.from(
                                { length: Math.ceil(cellAdditionalInfo.length / 3) },
                                (_, index) => cellAdditionalInfo.slice(index * 3, index * 3 + 3)
                            ).map((entry, index) => {
                                return (
                                    <Tr key={index} backgroundColor={index % 2 === 0 ? '#FFF' : '#F3F6F9'}>
                                        <HStack justifyContent='space-between' padding='20px' alignItems='flex-start'>
                                            {entry.map((passenger, index) => <Text width='100px' key={index}>{passenger}</Text>)}
                                        </HStack>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
                {/* <Grid templateColumns='repeat(3, 1fr)' gap='20px'>
                    {cellAdditionalInfo.map((entry, index) => (
                        <GridItem key={index} backgroundColor={index % 2 === 0 ? '#FFF' : '#F3F6F9'}>
                            {entry}
                        </GridItem>

                    ))}
                </Grid> */}
            </ModalBody>
        </React.Fragment >
    )
}