import { StringOrTemplateHeader } from "@tanstack/react-table"
import { FieldsetHTMLAttributes } from "react"

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

export interface GeneralInformationProps {
    type: 'general-information'
    fields: {
        title: string
        director: {
            directorName: string,
            directorDescription: string,
            directorImage: Image
        }
        image: Image
        section: GIPSection[]
        sectionImage: Image
    }
}

interface GIPSection{
    title: string
    items: {
        title: string,
        description: string
    }
}



export interface GIInput{
    fields:{
        title: string
        items: {
            fields: string[]
        }
    }
    entry: {
        fields: {
            title: string
        }
    }
    items:{
        entry: {
            fields: {
                items: {
                    fields: string[]
                }
            }
        }
    }
}

export interface Image {
    // fields: {
    //     image: {
    //         fields: {
    //             file: {
    //                 url: string
    //             }
    //         }
    //     }
    //     alt: string
    // }
    src: string
    alt: string
}

export interface CMSImageResponse {
    fields: {
        image: {
            fields: {
                file: {
                    url: string
                }
            }
        }
        alt: string
    }
}

export interface GISectionProps {
    fields: {
        items: {
            fields: {
                description: string,
                title: string
            }
        }
        title: string
    }
}

export interface GITypes {
    // section: [{fields: {...}}]
    title: string
    directorName: string
    directorDescription: string
    directorImage: CMSImageResponse
    image
}