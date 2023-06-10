import { Button, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { Table } from "@tanstack/table-core";
import { ExtensibleTableField } from "../../../../lib/types";

export default function TablePaginator({ tableInstance }: { tableInstance: Table<ExtensibleTableField> }) {
    return (
        <Stack width='100%' >
            <HStack>
                <Button
                    className="border rounded p-1"
                    onClick={() => tableInstance.setPageIndex(0)}
                    disabled={!tableInstance.getCanPreviousPage()}
                    fontSize='12px'
                    height='20px'
                    width='fit-content'
                >
                    {'<<'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => tableInstance.previousPage()}
                    disabled={!tableInstance.getCanPreviousPage()}
                    fontSize='12px'
                    height='20px'
                    width='fit-content'
                >
                    {'<'}
                </Button>
                <Text width='100px' textAlign='center'>
                    {`${tableInstance.getState().pagination.pageIndex + 1} of ${tableInstance.getPageCount()}`}
                </Text>
                <Button
                    className="border rounded p-1"
                    onClick={() => tableInstance.nextPage()}
                    disabled={!tableInstance.getCanNextPage()}
                    fontSize='12px'
                    height='20px'
                    width='fit-content'
                >
                    {'>'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
                    disabled={!tableInstance.getCanNextPage()}
                    fontSize='12px'
                    height='20px'
                    width='fit-content'
                >
                    {'>>'}
                </Button>
                <Select
                    width='fit-content'
                    value={tableInstance.getState().pagination.pageSize}
                    onChange={e => {
                        tableInstance.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Select>
            </HStack>
        </Stack>
    )
}