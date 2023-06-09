import { useMemo, useState } from "react"
import { ColumnDef, ColumnResizeMode, flexRender, getCoreRowModel, getSortedRowModel, Row, sortingFns, SortingState, Table, useReactTable } from "@tanstack/react-table"
import { ExtensibleTableField, TableColumns, TableProps } from "../../../lib/types"
import { Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Modal, ModalOverlay, ModalContent, Stack, Text, Button, Input, IconButton, HStack } from '@chakra-ui/react'

interface Props {
    data: TableProps
    cellAdditionalInfo: any[]
    columns: ColumnDef<ExtensibleTableField, any>[]
    // defaultColumnProps: {
    //     width: number;
    //     minWidth: number;
    //     maxWidth: number;
    // }
    ModalTemplate: ({ rowProps, cellAdditionalInfo }: {
        rowProps: Record<string, any>;
        cellAdditionalInfo: any[];
    }) => JSX.Element
}

export default function TableView({ data, cellAdditionalInfo, columns, ModalTemplate }: Props) {

    const memoData = useMemo(() => {
        return [...data.rows]
    }, [data])

    const memoColumns = useMemo(
        () => columns,
        []
    )

    const [columnResizeMode, setColumnResizeMode] =
        useState<ColumnResizeMode>('onChange')

    const [sorting, setSorting] = useState<SortingState>([])

    const tableInstance = useReactTable({
        data: memoData,
        columns: memoColumns,
        onSortingChange: setSorting,
        state: {
            sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

        columnResizeMode: 'onChange'
    })

    const {
        getHeaderGroups,
        getRowModel,
    } = tableInstance

    return (
        <TableContainer width='100%'>
            <ChakraTable>
                <Thead>
                    {getHeaderGroups().map((headerGroup, index) => (
                        <Tr key={index}>
                            {headerGroup.headers.map((column) => (
                                <Th key={JSON.stringify(column.id)} position='relative'>
                                    <Stack
                                        onClick={column.column.getToggleSortingHandler()}
                                        cursor={column.column.getCanSort() ? 'pointer' : 'auto'}
                                        width='fit-content'
                                    >
                                        <Text
                                            width='fit-content'
                                            p='5px'
                                            borderRadius='5px'
                                            transition='0.3s'
                                            _hover={{
                                                transition: '0.3s',
                                                cursor: 'pointer',
                                                backgroundColor: '#EEE'
                                            }}
                                        >
                                            {flexRender(column.column.columnDef.header, column.getContext())} {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[column.column.getIsSorted() as string] ?? null}
                                        </Text>
                                    </Stack>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {getRowModel().rows.map((row, index) => (
                        <TableAndModal
                            key={index}
                            row={row}
                            cellAdditionalInfo={cellAdditionalInfo}
                            index={index}
                            ModalTemplate={ModalTemplate}
                        />
                    ))}
                </Tbody>
            </ChakraTable>
        </TableContainer >
    )
}

function TableAndModal({
    row,
    cellAdditionalInfo,
    index,
    ModalTemplate
}: {
    row: Row<ExtensibleTableField>,
    cellAdditionalInfo: any[],
    index: number,
    ModalTemplate: ({ rowProps, cellAdditionalInfo }: {
        rowProps: Record<string, any>;
        cellAdditionalInfo: any[];
    }) => JSX.Element
}) {
    const { onToggle, onOpen, isOpen, onClose } = useDisclosure()
    const [isFocused, setIsFocused] = useState<boolean>(false)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'>
                <ModalOverlay />
                <ModalContent>
                    <ModalTemplate rowProps={row} cellAdditionalInfo={cellAdditionalInfo[index]} />
                </ModalContent>
            </Modal>
            <Tr
                key={index}
                onClick={onToggle}
                tabIndex={1}
                backgroundColor='#FFF'
                transition='0.3s'
                _hover={{
                    cursor: 'pointer',
                    backgroundColor: '#F3F6F9',
                    transition: '0.3s'
                }}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}
                onKeyDown={(event) => {
                    if ((event.key === ' ' || event.key === 'Space') && isFocused) {
                        onOpen()
                    }
                }}
            >
                {row.getVisibleCells().map((cell, index) => {
                    return (
                        <>
                            <Td
                                key={index}
                                {...{
                                    key: cell.id,
                                    style: {
                                        width: cell.column.getSize(),
                                    },
                                }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Td>
                        </>
                    )
                })}
            </Tr>
        </>
    )
}