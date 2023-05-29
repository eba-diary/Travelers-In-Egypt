import { useMemo } from "react"
import { useTable } from 'react-table'

export default function BoatPassengersTable({ bpData }) {
    /**
     * TODO
     * In the database-browser/boat-passengers page, make a request
     * to the backend to get the headers. In the backend, write a utility
     * function that processes the json data from the pscale db. We will pass
     * in that data here so that the table can configure the headers and accessors
     * in the case that the data changes in the future
     */

    const data = useMemo(() => {
        return bpData.map((obj, index) => {
            return {
                key: index,
                name: obj.name,
                shipdate: obj.shipdate,
                list: obj.lists
            };
        });
    }, [bpData]);
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Date',
                accessor: 'shipdate'
            },
            {
                Header: 'List',
                accessor: 'list'
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance



    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} key={JSON.stringify(column)}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={index}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} key={JSON.stringify(cell)}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}