
import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useStudentContributors } from './hooks/use-student-contributors';
import { isLoadingOrError } from '../../lib/hooks/utils';


const StudentContributors = () => {
	const { data, ...loadingOrError } = useStudentContributors();

	if (isLoadingOrError(loadingOrError)) {
		return <div></div>
	}

	return (
		<Box>
			<Text fontSize="2xl" fontWeight="bold">Student Contributors</Text>
			<Text mb={4}>
				Each year we have been fortunate to have a dedicated group of student interns working with us,
				who are valued and equal partners in our research endeavors. The scope of the tasks they have worked on
				includes transcribing, editing, conducting historical research, and managing technical aspects of the project.
			</Text>
			<Box borderWidth="1px" borderRadius="lg" p={4}>
				{Object.entries(data).map(([id, students]) => {
					const year = students[0].year;
					return (
						<Box key={id} mb={4}>
							<RadioGroup>
								<Stack direction="row" align="center">
									<Text fontSize="lg" fontWeight="bold">Contributors:</Text>
									<Box ml={2}>
										{students.map((student, index) => (
											<Text key={index}>{student.name}</Text>
										))}
									</Box>
									<Box ml={4}>
										<Radio value={String(year)}>{year}</Radio>
									</Box>
								</Stack>
							</RadioGroup>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default StudentContributors;
