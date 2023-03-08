export default async function handler(req, res) {
    try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URI}/database-browser`).then((res => res.json()))
        res.status(200).send({
            status: 'success',
            details: JSON.stringify(data)
        })
    } catch (error) {
        res.status(500).send({ status: 'error' })
    }
}