import { Checkbox, CheckboxGroup, HStack, IconButton, Input, Stack, VStack } from "@chakra-ui/react"
import { Column, Table } from "@tanstack/react-table"
import { ExtensibleTableField } from "../../../../lib/types"

export default function TableFilter<TData extends object>({
	column,
	table,
}: {
	column: Column<TData, any>
	table: Table<TData>
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id)


	const columnFilterValue = column.getFilterValue()

	return (
		<>
			{(() => {
				switch (typeof firstValue) {
					case 'number':
						return <HStack>
							<Input
								type="number"
								value={(columnFilterValue as [number, number])?.[0] ?? ''}
								onChange={e =>
									column.setFilterValue((old: [number, number]) => [
										e.target.value,
										old?.[1],
									])
								}
								placeholder={`Min`}
								width='75px'
							/>
							<Input
								type="number"
								value={(columnFilterValue as [number, number])?.[1] ?? ''}
								onChange={e =>
									column.setFilterValue((old: [number, number]) => [
										old?.[0],
										e.target.value,
									])
								}
								placeholder={`Max`}
								width='75px'
							/>
						</HStack>
					case 'string':
						const isEmoji = Array.from(firstValue).some((char) => char.charCodeAt(0) > 127)
						if (isEmoji) {
							return (
								<CheckboxGroup>
									<VStack alignItems='flex-start' p='5px'>
										<Checkbox
											isChecked={columnFilterValue === '❌'}
											onChange={(event) => column.setFilterValue(event.target.checked ? '❌' : '')}
										>
											❌
										</Checkbox>
										<Checkbox
											isChecked={columnFilterValue == '✅'}
											onChange={(event) => column.setFilterValue(event.target.checked ? '✅' : '')}
										>
											✅
										</Checkbox>
									</VStack>
								</CheckboxGroup>
							);
						}
						else if (new Date(`${firstValue}`) instanceof Date && !isNaN(Date.parse(firstValue))) {
							return (
								<HStack>
									<Stack height='50px' />
								</HStack>
							)
						}
						else {
							return (
								<Input
									type="text"
									value={(columnFilterValue ?? '') as string}
									onChange={e => column.setFilterValue(e.target.value)}
									placeholder={`Search...`}
									className="w-36 border shadow rounded"
								/>
							)
						}
					default:
						return null
				}
			})()}
		</>
	)
}