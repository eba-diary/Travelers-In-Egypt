import { client } from "../useContentful";
import {
    getCarousel,
    getCardDeck,
    getLargeSearchBar,
    getGeneralInformation,
    getStudentContributors,
    getDatabaseContainer,
    getToolContainer
} from "./getComponents";


export async function get(page) {
    const pageSlug = page.charAt(0).toUpperCase() + page.slice(1);
    try {
        const data = (await client.getEntries({
            content_type: "page",
            include: 10,
            select: 'fields',
            'fields.pageTitle': `${pageSlug}`
        })).items[0].fields.pageComponents

        const staticPageData = data.map((field) => {
            switch (field.fields.type.fields.type.toLowerCase().replaceAll(" ", "-")) {
                case 'carousel':
                    return getCarousel(field.fields)
                case 'card-deck':
                    return getCardDeck(field.fields)
                case 'large-search-bar':
                    return getLargeSearchBar(field.fields)
                case 'general-information':
                    return getGeneralInformation(field.fields)
                case 'student-contributors':
                    return getStudentContributors(field.fields)
                case 'database-container':
                    return getDatabaseContainer(field.fields)
                case 'tool-container':
                    return getToolContainer(field.fields)
                default:
                    return { fields: field }
            }
        })
        return staticPageData;
    } catch (error) {
        throw new Error(`Something went wrong on the client: ${error}`)
    }
}