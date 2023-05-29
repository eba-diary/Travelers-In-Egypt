export function getGeneralInformation(fields) {
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
            section: fields.section.map((entry) => {
                return {
                    title: entry.fields.title,
                    items: { ...entry.fields.items.fields }
                }
            })
        }
    }
}