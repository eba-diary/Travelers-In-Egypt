export interface TableProps {
    rows: ExtensibleTableField[]
}

interface ExtensibleTableField {
    [key: string]: any
}

export interface TableColumns {
    Header: string,
    accessor: string
}