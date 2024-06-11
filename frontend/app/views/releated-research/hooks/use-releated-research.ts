import { useState, useEffect } from 'react';

export interface ResearchItem {
	id: string;
	title: string;
	description: string;
}

export interface RelatedResearchData {
	category: string;
	items: ResearchItem[];
}

export const useRelatedResearch = () => {
	const [data, setData] = useState<RelatedResearchData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		// Simulate data fetching
		setTimeout(() => {
			const fetchedData: RelatedResearchData[] = [
				{
					category: 'Narratives',
					items: [
						{ id: '1', title: 'Applied Digital Humanities', description: 'This graduate-level class provides an introduction to the concepts and methodologies of using digital tools for dataset creation, curation and analysis, to answer research questions based on historical primary source documents.' },
						{ id: '2', title: 'Applied Digital Humanities', description: 'This graduate-level class provides an introduction to the concepts and methodologies of using digital tools for dataset creation, curation and analysis, to answer research questions based on historical primary source documents.' },
						{ id: '3', title: 'Applied Digital Humanities', description: 'This graduate-level class provides an introduction to the concepts and methodologies of using digital tools for dataset creation, curation and analysis, to answer research questions based on historical primary source documents.' },
						{ id: '4', title: 'Applied Digital Humanities', description: 'This graduate-level class provides an introduction to the concepts and methodologies of using digital tools for dataset creation, curation and analysis, to answer research questions based on historical primary source documents.' },
					],
				},
				{
					category: 'Digital Tools',
					items: [
						{ id: '1', title: 'Tool 1', description: 'Description for Tool 1.' },
						{ id: '2', title: 'Tool 2', description: 'Description for Tool 2.' },
					],
				},
				{
					category: 'Other Category',
					items: [
						{ id: '1', title: 'Other Item 1', description: 'Description for Other Item 1.' },
					],
				},
			];

			setData(fetchedData);
			setIsLoading(false);
		}, 1000);
	}, []);

	return {
		data,
		isLoading,
		isError,
	};
};
