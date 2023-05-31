export function getDatabaseContainer(field) {
    return {
        type: 'database-container',
        fields: {
            title: field.title,
            databaseCards: field.databaseCards.map((entry) => {
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