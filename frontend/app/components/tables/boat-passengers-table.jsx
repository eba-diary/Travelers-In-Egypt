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
        return bpData.map(obj => {
            return {
                name: obj.name,
                shipdate: obj.shipdate,
                list: obj.lists
            };
        });
    }, []);

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
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
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