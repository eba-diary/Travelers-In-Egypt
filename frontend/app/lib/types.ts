export interface Table {
    rows: ExtensibleTableField[]
}

interface ExtensibleTableField {
    [key: string]: any
}

export interface TableColumns {
    Header: string,
    accessor: string
}