
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Student {
	name: string;
	year: number;
}

interface StudentContributors {
	[key: string]: Student[];
}

export const useStudentContributors = () => {
	const [data, setData] = useState<StudentContributors>({});

	useEffect(() => {
		// Simulate data fetching until we have a dedicated table to store 
		const fetchedData: StudentContributors = {
			[uuidv4()]: [{ name: 'Alice', year: 2023 }, { name: 'Bob', year: 2023 }],
			[uuidv4()]: [{ name: 'John', year: 2022 }],
			[uuidv4()]: [{ name: 'David', year: 2021 }, { name: 'Eve', year: 2021 }],
		};

		setData(fetchedData);
	}, []);

	return {
		data,
		isLoading: false,
		isError: false
	};
};


