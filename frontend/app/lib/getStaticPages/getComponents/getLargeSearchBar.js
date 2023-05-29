export function getLargeSearchBar(fields) {
    return {
        type: 'large-search-bar',
        fields: {
            title: fields.title,
            descirption: fields.description,
            searchPlaceholder: fields.searchPlaceholder,
            databases: fields.databases.map((entry) => {
                return { ...entry.fields }
            })
        }
    }
}