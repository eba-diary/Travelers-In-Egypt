import { useMemo, useState } from "react"
import { useTable } from "react-table"
import { TableColumns, TableProps } from "../../../lib/types"
import { Text, Collapse, HStack, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Modal, ModalHeader, ModalBody, ModalCloseButton, ModalOverlay, ModalContent } from '@chakra-ui/react'

interface Props {
    data: TableProps
    cellAdditionalInfo: any[][]
    columns: TableColumns[]
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
        <TableContainer width='100%'>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()} key={JSON.stringify(column)}>
                                    {column.render('Header')}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        (() => { })
                        prepareRow(row)
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
                                    {...row.getRowProps()}
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
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <>
                                                <Td
                                                    key={index}
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render('Cell')}
                                                </Td>
                                            </>
                                        )
                                    })}
                                </Tr>
                            </>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}