interface Props {
    title: string
    description: string
    toolHeaderCards: any[]
}

export function getToolContainer(fields: Props) {
    return {
        type: 'tool-container',
        fields: {
            title: fields.title,
            description: fields.title,
            toolHeaderCards: fields.toolHeaderCards.map((entry) => {
                return {
                    title: entry.fields.title,
                    description: entry.fields.description,
                    url: entry.fields.url,
                    image: {
                        src: 'https:' + entry.fields.image.fields.image.fields.file.url,
                        alt: entry.fields.image.fields.alt
                    }
                }
            })
        }
    }
}