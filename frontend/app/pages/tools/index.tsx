import StaticPageTemplate from '../../components/StaticPageTemplate'
import { get } from '../../lib/getStaticPages/get'


interface Props {
    components: object
}

export default function Tools({ components }: Props) {
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