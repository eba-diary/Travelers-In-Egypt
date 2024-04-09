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
			"description": "To provide access to lesser known or understudied literary and historical texts from the Near East, in the form of databases of transcribed and encoded archival material"
		},
		{
			"imageUrl": "",
			"alt": "",
			"title": "Research",
			"description": "To provide access to lesser known or understudied literary and historical texts from the Near East, in the form of databases of transcribed and encoded archival material"
		},
		{
			"imageUrl": "",
			"alt": "",
			"title": "Pedagogy",
			"description": "To provide access to lesser known or understudied literary and historical texts from the Near East, in the form of databases of transcribed and encoded archival material"
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