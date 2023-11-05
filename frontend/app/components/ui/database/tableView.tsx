import { useMemo, useState } from "react"
import {
	ColumnDef,
	ColumnResizeMode,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
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
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	Stack,
	Text,
	Button
} from '@chakra-ui/react'

import TablePaginator from "./filters/table-paginator"
import TableFilter from "./filters/table-filter"

interface Props<TData extends object> {
	data: TData[]
	cellAdditionalInfo: any[]
	columns: ColumnDef<TData, any>[]

	ModalTemplate: ({ rowProps, cellAdditionalInfo }: {
		rowProps: Record<string, any>;
		cellAdditionalInfo: any[];
	}) => JSX.Element
}

export default function TableView<TData extends object>({ data, cellAdditionalInfo, columns, ModalTemplate }: Props<TData>) {

	const memoData = useMemo(() => {
		return [...data]
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
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange'
	})

	const {
		getHeaderGroups,
		getRowModel,
	} = tableInstance

	return (
		<>
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
			</TableContainer>
			<TablePaginator<TData> tableInstance={tableInstance} />
		</>

	)
}


function TableAndModal<TData extends object>({
	row,
	cellAdditionalInfo,
	index,
	ModalTemplate
}: {
	row: Row<TData>,
	cellAdditionalInfo: any[],
	index: number,
	ModalTemplate: ({ rowProps, cellAdditionalInfo }: {
		rowProps: Record<string, any>;
		cellAdditionalInfo: any[];
	}) => JSX.Element
}): JSX.Element {
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