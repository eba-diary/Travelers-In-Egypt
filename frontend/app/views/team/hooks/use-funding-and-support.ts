import { useState, useEffect } from 'react';

interface FundingSupport {
	id: string;
	name: string;
}

export const useFundingSupport = () => {
	const [data, setData] = useState<FundingSupport[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		// Simulate data fetching
		const fetchedData: FundingSupport[] = [
			{ id: '1', name: 'National Endowment for the Humanities' },
			{ id: '2', name: 'Simpson Center for the Humanities' },
			{ id: '3', name: 'DHSI' },
			{ id: '4', name: 'Compute Canada' },
			{ id: '5', name: 'APA' },
			{ id: '6', name: 'University of Washington' },
			{ id: '7', name: 'Mary Gates Endowment' },
			{ id: '8', name: 'McNair Scholar' },
		];

		setData(fetchedData);
		setIsLoading(false);
	}, []);

	return {
		data,
		isLoading,
		isError,
	};
};
