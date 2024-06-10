import React, { useEffect, useMemo, useState } from "react"
import {
	ColumnDef,
	ColumnResizeMode,
	CoreRow,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	RowData,
	SortingState,
	useReactTable
} from "@tanstack/react-table"
import {
	Table as ChakraTable,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Stack,
	Text,
	Button
} from '@chakra-ui/react'

import TablePaginator from "./filters/table-paginator"
import TableFilter from "./filters/table-filter"
import { Sidebar } from "./sidebar/sidebar"
import useCollapsibleSidebar, { CollapsibleSidebarContext } from "../../../lib/hooks/context/use-collapsible-sidebar"

interface Props<TData extends RowData> {
	data: TData[]
	columns: ColumnDef<TData, any>[],
	children?: (
		props: CollapsibleSidebarContext
	) => JSX.Element
}

export default function TableView<TData extends object>({ data, columns, children }: Props<TData>) {

	const memoData = useMemo(() => {
		return [...data]
	}, [data])

	const memoColumns = useMemo(
		() => columns,
		[]
	)

	const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')

	const [sorting, setSorting] = useState<SortingState>([])

	const tableInstance = useReactTable<TData>({
		data: memoData,
		columns: memoColumns,
		onSortingChange: setSorting,
		state: {
			sorting
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange'
	})

	const {
		getHeaderGroups,
		getRowModel,
	} = tableInstance

	const {
		setCurrentRow,
		setIsOpen,
		setRowData,
		currentRow,
		isOpen,
		rowData
	} = useCollapsibleSidebar()

	return (
		<div style={{ width: "100%" }}>
			{children({
				setCurrentRow,
				setIsOpen,
				setRowData,
				currentRow,
				isOpen,
				rowData
			})}
			<Stack width='100%'>
				<Button
					width='fit-content'
					onClick={() => {
						getHeaderGroups().map(headerGroup => {
							headerGroup.headers.map(column => {
								column.column.setFilterValue('')
							})
						})
					}}
					m='0px 15px'
				>
					Clear Filters
				</Button>
			</Stack>
			<TablePaginator<TData> tableInstance={tableInstance} />
			<TableContainer width='100%'>
				<ChakraTable>
					<Thead>
						{getHeaderGroups().map((headerGroup, index) => (
							<Tr key={index}>
								{headerGroup.headers.map((column) => {
									return (
										<Th key={column.id}>
											<Stack
												onClick={column.column.getToggleSortingHandler()}
												cursor={column.column.getCanSort() ? 'pointer' : 'auto'}
												width='100%'
												alignItems="flex-start"
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
											{column.column.getCanFilter() ? (
												<TableFilter<TData>
													column={column.column}
													table={tableInstance}
												/>
											) : (
												null
											)}
										</Th>
									)
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{getRowModel().rows.map((row, index) => (
							<Tr
								onClick={() => {
									if (currentRow === row.id) {
										setIsOpen(false)
										setCurrentRow(null)
										setRowData(null)
									} else {
										setIsOpen(true)
										setCurrentRow(row.id)
										setRowData(row)
									}
								}}
								key={index}
								tabIndex={1}
								backgroundColor='#FFF'
								transition='0.3s'
								_hover={{
									cursor: 'pointer',
									backgroundColor: '#F3F6F9',
									transition: '0.3s'
								}}
							// onFocus={() => {
							// 	setIsFocused(true)
							// }}
							// onBlur={() => {
							// 	setIsFocused(false)
							// }}
							// onKeyDown={(event) => {
							// 	if ((event.key === ' ' || event.key === 'Space') && isFocused) {
							// 		onOpen()
							// 	}
							// }}
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
														padding: "14px 24px" // could be used later to change sizing based on user preference 
													},
												}}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										</>
									)
								})}
							</Tr>
						))}
					</Tbody>
				</ChakraTable>
			</TableContainer>
			<TablePaginator<TData> tableInstance={tableInstance} />
		</div>

	)
}