import { client } from "../useContentful";
import { getBannerCarousel } from "./getComponents/getBanner";


export async function get(page) {
    const pageSlug = page.charAt(0).toUpperCase() + page.slice(1);
    try {
        const data = (await client.getEntries({
            content_type: "staticPage",
            include: 10,
            select: 'fields',
            'fields.type': `${pageSlug}`
        })).items[0].fields

        const staticPageData = data.fields.map((field) => {
            switch (field.fields.type.fields.type.toLowerCase().replaceAll(" ", "-")) {
                case 'banner-carousel':
                    return getBannerCarousel(field)
                default:
                    return { fields: field }
            }
        })
        return staticPageData;
    } catch (error) {
        throw new Error(`Something went wrong on the client: ${error}`)
    }
}