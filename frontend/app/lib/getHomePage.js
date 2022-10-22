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

    const getGeneralProjectInformation = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'accordion',
                select: 'fields',
                include: 10,
                "fields.slug": "Home Informational Accordion"
            })
            let projectInfo;

            entries.items.forEach((entry) => {
                projectInfo = {
                    ...projectInfo,
                    data: entry.fields.fields.map((entry) => {
                        return {
                            title: entry.fields.title,
                            description: entry.fields.description,

                        }
                    })
                }
            })
            return {
                projectInfo: projectInfo,
                title: entries.items[0].fields.title ?? ''
            }
        } catch (error) {
            throw new Error(`General Project Information Accordion failed to load: ${error}`)
        }
    }

    const getStudentContributors = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'accordion',
                select: 'fields',
                include: 10,
                "fields.slug": "Home Student Contributors Accordion"
            })
            let studentInfo;

            entries.items.forEach((entry) => {
                studentInfo = {
                    ...studentInfo,
                    data: entry.fields.fields.map((entry) => {
                        return {
                            title: entry.fields.title,
                            students: entry.fields.student.map((entry) => {
                                return {
                                    name: entry.fields.fullName,
                                    src: `https:${entry.fields.headshot.fields.file.url}`,
                                    alt: entry.fields.headshot.fields.description
                                }
                            })
                        }
                    })
                }
            })
            return studentInfo
        } catch (error) {
            throw new Error(`Student Contributors failed to load: ${error}`)
        }
    }

    return { getFullScreenBanner, getHomeSearchBar, getFeaturedArticles, getGeneralProjectInformation, getStudentContributors }
}