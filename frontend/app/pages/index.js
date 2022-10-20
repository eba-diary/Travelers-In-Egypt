import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../lib/useContentful'
import { Flex, Text, useColorModeValue, Circle, HStack } from "@chakra-ui/react";
import Layout from '../components/utils/Layout';
import { getHomePage } from '../lib/getHomePage';

export default function Landing({ articles, banner }) {
	// const bannerItems = banner.items.map((entry) => {
	// 	let test = entry.fields.bannerItems.map((entry) => {
	// 		console.log(entry.fields.title)
	// 	})
	// 	return test
	// })

	console.log(banner)

	const [featuredArticles, setFeaturedArticles] = useState({
		articles: []
	})

	useEffect(() => {
		setFeaturedArticles({ articles: articles?.items })
	}, [])

	let boxBg = useColorModeValue("white", "white");
	const paddingBg = useColorModeValue("#C58A22", "white");
	const outerBoxStyles = {
		bgColor: '#F8C66C',
		borderTop: '40px solid white'
	}

	return (
		<Layout index={0}>
			{/* <pre>{JSON.stringify(homeComponents)}</pre> */}
			<HStack justifyContent='center'>
				{featuredArticles.articles.map((entries, index) => {
					const sliderCard = entries.fields.sliderCards.map((entries, index) => {
						return (
							<Flex borderRadius='unset'
								h='140px'
								w='170px'
								direction='column'
								bg={boxBg}
								alignItems='center'
								justifyContent='center'
								border='5px solid'
								borderBottom='20px solid'
								borderColor={paddingBg}
								key={index}
								rowGap='20px'
								columnGap='20px'
								marginTop='-25px'
								marginBottom='15px'
							>
								<Text> {entries.fields.title} </Text>
								<Text> {entries.fields.description} </Text>
							</Flex>
						)
					})
					return (
						<Flex key={index}
							rowGap='20px'
							columnGap='20px'
							direction='row'
							sx={outerBoxStyles}
							justifyContent='center'
						>
							<Circle size='40px' bg='white' color='white' marginTop='45px' border='5px solid' borderColor={paddingBg}></Circle>
							{sliderCard}
							<Circle size='40px' bg='white' color='white' marginTop='45px' border='5px solid' borderColor={paddingBg}></Circle>
						</Flex>
					)
				})
				}
			</HStack>
		</Layout>
	)

}

export async function getServerSideProps() {
	const { getFeaturedArticles } = useContentfulLanding()
	const { getFullScreenBanner } = getHomePage()

	const articles = await getFeaturedArticles()
	const banner = await getFullScreenBanner()

	return {
		props: {
			articles: articles,
			banner: banner
		}
	}
}