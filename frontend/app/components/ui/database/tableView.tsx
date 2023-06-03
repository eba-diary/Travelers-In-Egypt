import { useMemo } from "react"
import { Column, useTable, UseTableColumnProps } from "react-table"
import { TableColumns, Table } from "../../../lib/types"
import { Stack, Text } from '@chakra-ui/react'

interface Props {
    data: Table
    columns: TableColumns[]
}

export default function TableView({ data, columns }: Props) {
    const memoData = useMemo(() => {
        return [...data.rows]
    }, [data])

    const memoColumns = useMemo(
        () => columns,
        []
    )

    const tableInstance = useTable({
        columns: memoColumns,
        data: memoData
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
        <Stack gap='20px'>
            <Text>
                {JSON.stringify(headerGroups)}
            </Text>
        </Stack>
    )
}