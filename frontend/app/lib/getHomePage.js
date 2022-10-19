import axios from "axios";
import { client } from "./useContentful";

export function getHomePage() {
    const getBanner = async () => {
        try {
            const components = await client.getEntries({
                content_type: 'home',
                select: 'fields'
            })
            return components
        } catch (error) {
            console.log(error)
        }
    }
    return { getBanner }
}