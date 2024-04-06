import { get } from '../lib/getStaticPages/get';
import StaticPageTemplate from '../components/StaticPageTemplate';
import usePageNumber from '../lib/hooks/usePageNumber';
import { Banner } from '../views/home/banner';

export default function Home({ components }) {
	return (
		<Banner />
	)
}