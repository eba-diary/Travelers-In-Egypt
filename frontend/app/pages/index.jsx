import Layout from '../components/utils/Layout';
import { get } from '../lib/getStaticPages/get';
import StaticPageTemplate from '../components/StaticPageTemplate';
import { setIndex, setIndexServerSide } from '../lib/redux/slice/preSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import usePageNumber from '../lib/hooks/usePageNumber';

export default function Home({ components }) {
	usePageNumber(0)
	return (
		<StaticPageTemplate components={components} />
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