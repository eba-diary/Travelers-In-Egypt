export function getGeneralInformation(fields) {
    return {
        type: 'general-information',
        fields: {
            titleBorderColor: fields.titleBorderColor,
            titleShadowColor: fields.titleShadowColor,
            titleColor: fields.titleColor,
            directorBottomBorderColor: fields.directorBottomBorderColor,
            imageShadowColor: fields.imageShadowColor,
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
            section: fields.section.map((entry) => {
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
    }
}