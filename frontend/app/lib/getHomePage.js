import { client } from "./useContentful";
import axios from 'axios'
import { API_BASE_URI } from "./globals";

export function getHomePage() {

    const getFullScreenBanner = async () => {
        try {
            const banner = await client.getEntries({
                content_type: 'fullScreenBannerCarousel',
                select: 'fields',
                include: 10
            })

            // const bannerItems = banner.items.map((entry) => {
            //     return entry.fields.bannerItems.map((entry) => {
            //         let button = getButton(entry.fields.button.sys.id)
            //         return {
            //             title: entry.fields.title,
            //             description: entry.fields.description,
            //             button: button
            //             // image: https://images.ctfassets.net
            //         }
            //     })
            // })
            return banner
        } catch (error) {
            console.log(error)
        }
    }



    const getButton = async (buttonId) => {
        const buttonData = await axios.get(
            `${API_BASE_URI}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_KEY}/environments/master/entries/${buttonId}?access_token=${process.env.process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY_DEV}`
        )
        return buttonData
    }

    return { getFullScreenBanner }
}