import { client } from "../useContentful";

export async function getNavbar() {
    const data = (await (client.getEntries({
        content_type: 'staticPages',
        include: 1,
        select: 'fields'
    }))).items[0].fields.pages

    return {
        navItems: data.map((entry) => {
            return {
                tab: entry.fields.pageTitle
            }
        })
    }
}