import { client } from "./useContentful";
import axios from 'axios'
import { API_BASE_URI } from "./globals";

export function getHomePage() {

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
            })
            return banner
        } catch (error) {
            throw new Error(`Fullscreen banner failed to load: ${error}`)
        }
    }

    const getHomeSearchBar = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'generalSearchBar',
                select: 'fields',
                include: 10,
                "fields.slug": "Home Search Bar"
            })
            let searchBar;

            entries.items.forEach((entry) => {

                searchBar = {
                    ...searchBar,
                    description: entry.fields.description,
                    searchBarPlaceHolder: entry.fields.searchBarPlaceholder,
                    title: entry.fields.title
                }
            })
            return searchBar ?? { error: 'does not exist' }
        } catch (error) {
            throw new Error(`Home search bar failed to load ${error} `)
        }
    }

    const getFeaturedArticles = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'contentSlider',
                select: 'fields',
                include: 10,
                "fields.title": "Featured Articles"
            })
            return entries
        } catch (error) {
            throw new Error(`Articles failed to load: ${error}`)
        }
    }

    return { getFullScreenBanner, getHomeSearchBar, getFeaturedArticles }
}