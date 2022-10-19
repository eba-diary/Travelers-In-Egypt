import { createClient } from 'contentful'


const client = createClient({
    space: `${process.env.REACT_APP_CONTENTFUL_SPACE_KEY}`,
    accessToken: `${process.env.REACT_APP_CONTENTFUL_API_KEY_DEV}`,
    host: 'preview.contentful.com'
})

const useContentful = () => {

}

const useContentfulLanding = () => {
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

export { useContentful, useContentfulLanding }