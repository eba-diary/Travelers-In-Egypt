import { client } from "./useContentful";
import axios from 'axios'
import { API_BASE_URI } from "./globals";

export function getHomePage() {

    const getAll = async () => {
        try {
            const home = await client.getEntries({
                content_type: 'home',
                select: 'fields',

            })




        } catch (error) {
            console.log(error)
        }
    }

    const getFullScreenBanner = async () => {
        try {
            const rawData = await client.getEntries({
                content_type: 'fullScreenBannerCarousel',
                select: 'fields',
                include: 10,
                "fields.entryTitle": "Home Page Carousel"
            })
            const banner = rawData.items.map((entry) => {
                const bannerItem = entry.fields.bannerItems.map((entry) => {
                    const title = entry.fields.title
                    const button = { title: entry.fields.button.fields.title, url: entry.fields.button.fields.url }
                    const description = { description: entry.fields.description }
                    const image = { src: `https:${entry.fields.image.fields.image.fields.file.url}`, alt: entry.fields.image.fields.alt }

                    return {
                        title: title,
                        button: button,
                        description: description,
                        image: image
                    }
                })
                return bannerItem
                // return entry
            })
            return banner
        } catch (error) {
            console.log(error)
        }
    }

    return { getFullScreenBanner }
}