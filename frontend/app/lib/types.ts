export interface TableProps {
    rows: ExtensibleTableField[]
}

export interface ExtensibleTableField {
    [key: string]: any
}

export interface TableColumns {
    Header: string,
    accessor: string
}