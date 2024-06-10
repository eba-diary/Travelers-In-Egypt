import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface StudentContributor {
	id: string;
	name: string;
	year: string;
}

export const useStudentContributors = () => {
	const [data, setData] = useState<StudentContributor[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		try {
			// Simulate data fetching
			const fetchedData: StudentContributor[] = [
				{ id: uuidv4(), name: 'Alice', year: '2023' },
				{ id: uuidv4(), name: 'Bob', year: '2023' },
				{ id: uuidv4(), name: 'John', year: '2022' },
				{ id: uuidv4(), name: 'David', year: '2021' },
				{ id: uuidv4(), name: 'Eve', year: '2021' },
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
