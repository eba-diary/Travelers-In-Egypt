import StaticPageTemplate from '../../components/StaticPageTemplate'
import { get } from '../../lib/getStaticPages/get'


export default function Tools({ components }) {
    return (
        <StaticPageTemplate components={components} />
    )
}

export async function getServerSideProps() {
    const components = await get('tools')

    return {
        props: {
            components
        }
    }
}