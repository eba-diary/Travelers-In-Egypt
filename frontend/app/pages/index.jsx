import Layout from '../components/utils/Layout';
import { get } from '../lib/getStaticPages/get';
import StaticPageTemplate from '../components/StaticPageTemplate';

export default function Home(
	{ components }
) {
	return (
		<Layout index={0}>
			<StaticPageTemplate components={components} />
		</Layout>
	)

}

export async function getStaticProps() {

	const components = await get('home')

	return {
		props: {
			components
		}
	}
}

{/* <CmsTester props={projectInfo} /> */ }
{/* <FullScreenBanner bannerItems={banner} /> */ }
{/* <GeneralSearchBar searchBar={searchBar} />
			<HStack justifyContent='center'>
				{
					featuredArticles.articles.map((entries, index) => {
						const sliderCards = entries.fields.sliderCards.map((entries, index) => {
							return (
								<Flex borderRadius='unset'
									key={index}
									h='180px'
									w='210px'
									direction='column'
									bg={boxBg}
									alignItems='center'
									justifyContent='center'
									border='6px solid'
									borderBottom='26px solid'
									borderColor={paddingBg}
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
			</Stack> */}