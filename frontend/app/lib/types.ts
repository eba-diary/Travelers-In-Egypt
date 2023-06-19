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

export enum LICENSE {
    CC_Attr_nonComm = 'Creative Commons Attribution Non-Commercial',
    CC_Attr = 'Creative Commons Attribution',
    CC_Attr_ShareAlike = 'Creative Commons Attribution ShareAlike',
    CC_Attr_NonComm_ShareAlike = 'Creative Commons Attribution Non-Commercial ShareAlike',
}

export interface HMTFormProps {
    title: string
    author: string
    editor: string
    publisher: string
    publisher_address: string
    publication_date: string
    license: LICENSE,
    source_description: string
    project_description: string
    raw_text: string
}