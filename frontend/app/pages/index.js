import { useState, useEffect } from 'react';
import { Flex, Text, useColorModeValue, HStack, Stack, Accordion } from "@chakra-ui/react";
import Layout from '../components/utils/Layout';
import { getHomePage } from '../lib/getHomePage';
import FullScreenBanner from '../components/content/full-screen-banner';
import AboutUs from '../components/content/about-us';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import StudentSection from '../components/content/student-section';
import dynamic from 'next/dynamic';
import CardSlider from '../components/content/content-slider';

export default function Home(
	{ articles, searchBar, banner, projectInfo, students }
) {
	const [featuredArticles, setFeaturedArticles] = useState({
		articles: []
	})

	const GeneralSearchBar = dynamic(() => import('../components/content/general-search-bar'))
	const AccordionTable = dynamic(() => import('../components/content/accordion-table'))

	useEffect(() => {
		setFeaturedArticles({ articles: articles?.items })
	}, [])

	const DEFAULT_INDEX = 0

	let boxBg = useColorModeValue("white", "white");
	const paddingBg = useColorModeValue("#C58A22", "white");
	const outerBoxStyles = {
		bgColor: '#F8C66C',
		borderTop: '40px solid white'
	}

	return (
		<Layout index={0}>
			<FullScreenBanner bannerItems={banner} />
			<GeneralSearchBar searchBar={searchBar} />
			<HStack justifyContent='center'>
				 {
				 featuredArticles.articles.map((entries, index) => { 
				 	 const sliderCards = entries.fields.sliderCards.map((entries, index) => { 
				 		return (
				 			<Flex borderRadius='unset'
				 				h='180px'
				 				w='210px'
				 				direction='column'
				 				bg={boxBg}
				 				alignItems='center'
				 				justifyContent='center'
				 				border='6px solid'
				 				borderBottom='26px solid'
				 				borderColor={paddingBg}
				 				key={index} 
								rowGap='20px'
				 				columnGap='20px'
				 			>
				 				<Text> {entries.fields.title} </Text>
				 				<Text> {entries.fields.description} </Text>
				 			</Flex>
				 		) 
					 })
					return ( 
						<Flex
							rowGap='20px'
							columnGap='20px'
							direction='row'
							width='100%'
							sx={outerBoxStyles}
							justifyContent='center'
						>
							<CardSlider gap={20}>
                				{sliderCards}
							</CardSlider>
						</Flex>
					 ) 
				 }) 
				 } 
			</HStack>
			<AboutUs />
			<HStack width='100%' justifyContent='flex-start' paddingTop='50px' paddingLeft='75px'>
				<Accordion
					width='800px'
					allowMultiple
					defaultIndex={[DEFAULT_INDEX]}
				>
					{projectInfo.projectInfo.data.map((entry, index) => {
						return (
							<AccordionTable
								key={index}
								title={entry.title}
								defaultIndex={index === DEFAULT_INDEX}
							>
								<Text dangerouslySetInnerHTML={{ __html: documentToHtmlString(entry.description) }} />
							</AccordionTable>
						)
					})}
				</Accordion>
				<Stack width='350px' height='320px' backgroundColor='#C58A22' />
			</HStack> {'problem'}
			<Stack width='100%' justifyContent='flex-start' paddingTop='50px' pl='75px' pr='75px'>
				<Text fontSize='28px'>Student Contributors</Text>
				<Accordion
					width='100%'
					allowMultiple
					defaultIndex={[DEFAULT_INDEX]}
				>
					{students.data.map((entry, index) => {
						return (
							<AccordionTable
								key={index}
								title={`Student Contributors of ${entry.title}`}
								defaultIndex={index === DEFAULT_INDEX}
							>
								<StudentSection students={entry.students} />
							</AccordionTable>
						)
					})}
				</Accordion>
			</Stack>
		</Layout>
	)

}

export async function getStaticProps() {
	const {
		getFullScreenBanner,
		getHomeSearchBar,
		getFeaturedArticles,
		getGeneralProjectInformation,
		getStudentContributors
	} = getHomePage()

	const articles = await getFeaturedArticles()
	const searchBar = await getHomeSearchBar()
	const banner = await getFullScreenBanner()
	const projectInfo = await getGeneralProjectInformation()
	const students = await getStudentContributors()

	return {
		props: {
			articles: articles,
			searchBar: searchBar,
			banner: banner,
			projectInfo: projectInfo,
			students: students
		}
	}
}