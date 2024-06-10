// hooks/useDatabases.ts
import { useState, useEffect } from 'react';

export interface Database {
	id: string;
	name: string;
	description: string;
	url: string;
}

export const useDatabase = () => {
	const [data, setData] = useState<Database[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	/** move into hook later */
	const version = "v1"

	useEffect(() => {
		try {
			// Simulate data fetching
			const fetchedData: Database[] = [
				{
					id: '1',
					name: 'Emma B. Andrews Database',
					description:
						'The Emma B. Andrews database comprises a collection of 19 volumes of a travel journal, written between 1889 and 1913, displayed as an online e-reader with contextual notes about the people and places mentioned in the journals.\n\nTechnical information: txt transcriptions are encoded in XML, following a TEI schema. The XML documents are stored in an eXist database, and published on the website using TEIPublisher.',
					url: '/database/v1/eba',
				},
				{
					id: '2',
					name: 'Nile Travelogues Database',
					description:
						'Nile Travelogues aggregates a selection of travel and personal memoirs published in the late 19th and early 20th centuries. This database was developed from a list of publications in Nile Notes of a Howadji by Martin Kalafoak. Many of these publications can be read directly from this website, thanks to book scans from the Internet Archive.\n\nTechnical information: backend searchable SQL database. Internet Archive BookReader',
					url: '/database/v1/nile-travelogues',
				},
				{
					id: '3',
					name: 'Boat Passenger Database',
					description:
						'The Thomas Cook Passenger database catalogs lists of travelers who joined a package tour on one of tour operator Thos. Cook\'s Nile steamers. The dates currently covered include 1890-1892, 1897, 1900 and 1911.\n\nTechnical information: backend searchable SQL database.',
					url: '/database/v1/boat-passenger',
				},
			];

			setData(fetchedData);
			setIsLoading(false);
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	}, []);

	return {
		data,
		isLoading,
		isError,
	};
};
