import { createClient } from 'contentful'


export const client = createClient({
    space: `${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_KEY}`,
    accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY_DEV}`,
    host: 'preview.contentful.com'
})

export const useContentfulLanding = () => {
    const getFeaturedArticles = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'contentSlider',
                select: 'fields'
            })
            return entries
        } catch (error) {
            console.log(`error fetching articles: ${error}`)
        }
    }

    return { getFeaturedArticles }
}
