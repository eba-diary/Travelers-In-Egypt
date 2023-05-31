import { Stack, Text } from "@chakra-ui/react";
import { get } from "../../../lib/getStaticPages/get";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import StaticPageTemplate from '../../../components/StaticPageTemplate';

export default function V1({ components }) {
    usePageNumber(1)
    return (
        <StaticPageTemplate components={components} />
    )
}

export async function getServerSideProps() {
    const components = await get('research')

    return {
        props: {
            components
        }
    }
}