interface AboutPageArgs {
	flashCards: UseQueryArgs<Card[]>
}

interface Card {
	imageUrl: string,
	alt: string,
	title: string,
	description: string
}

export interface UseQueryArgs<TData> {
	data: TData,
	isLoading: boolean,
	isError: boolean
}

export const useAboutPage = (): AboutPageArgs => {
	/** TODO: When custom cms is up, replace it with a useQuery to fetch the props instead */
	const flashCardsData = [
		{
			"imageUrl": "",
			"alt": "",
			"title": "Preservation",
			"description": "Preserving and providing access to lesser known or understudied literary and historical texts from the Near East, in the form of databases of transcribed and encoded archival material."
		},
		{
			"imageUrl": "",
			"alt": "",
			"title": "Research",
			"description": "Researching and publishing biographical and geographical narratives to provide historical context for primary source documents."
		},
		{
			"imageUrl": "",
			"alt": "",
			"title": "Pedagogy",
			"description": "Training undergraduates in the core skills associated with historical and literary research, coupled with essential competencies in digital literacy. Showcasing classroom and project work completed by students."
		}
	]

	/** Everything is synchronous for now so defaulting to false */
	return {
		flashCards: {
			data: flashCardsData,
			isError: false,
			isLoading: false,
		}
	}
}