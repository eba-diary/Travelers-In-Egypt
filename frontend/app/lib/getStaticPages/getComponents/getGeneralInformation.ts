import { CMSImageResponse, GeneralInformationProps, Image, GIInput, GISectionProps, GITypes } from "../../types"

interface Props {
    title: string
    directorName: string
    directorDescription: string
    directorImage: CMSImageResponse
    image: CMSImageResponse
    section: GISectionProps[]
    sectionImage: CMSImageResponse
}

export function getGeneralInformation(fields: Props) {
    console.log(fields)
    return {
        type: 'general-information',
        fields: {
            title: fields.title,
            director: {
                directorName: fields.directorName,
                directorDescription: fields.directorDescription,
                directorImage: {
                    src: 'https:' + fields.directorImage.fields.image.fields.file.url,
                    alt: fields.directorImage.fields.alt
                }
            },
            image: {
                src: 'https:' + fields.image.fields.image.fields.file.url,
                alt: fields.image.fields.alt
            },
            section: fields.section.map((entry: GISectionProps) => {
                return {
                    title: entry.fields.title,
                    items: { ...entry.fields.items.fields }
                }
            }),
            sectionImage: {
                src: 'https:' + fields.sectionImage.fields.image.fields.file.url,
                alt: fields.sectionImage.fields.alt
            }
        }
    } as GeneralInformationProps
}