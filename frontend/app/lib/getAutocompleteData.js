import axios from "axios";

export default function getAutocompleteData() {
    const rawData = axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/api/data`)
    console.log(rawData)
    return rawData
}