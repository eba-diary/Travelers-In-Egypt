import { get } from '../lib/getStaticPages/get';
import StaticPageTemplate from '../components/StaticPageTemplate';
import usePageNumber from '../lib/hooks/usePageNumber';
import { Banner } from '../views/home/banner';
import { About } from '../views/home/about';

export default function Home({ components }) {
	return (
		<About />
	)
}