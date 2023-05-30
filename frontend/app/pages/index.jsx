import Layout from '../components/utils/Layout';
import { get } from '../lib/getStaticPages/get';
import StaticPageTemplate from '../components/StaticPageTemplate';
import { getNavbar } from '../lib/getPageInfo/getNavbar';

export default function Home({ components }) {
	return (
		<Layout index={0}>
			<StaticPageTemplate components={components} />
		</Layout>
	)

}

export async function getServerSideProps() {
	const components = await get('home')

	return {
		props: {
			components,
		}
	}
}