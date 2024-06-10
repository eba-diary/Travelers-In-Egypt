
import React, { FC, useEffect, useMemo } from 'react';
import { Box, Text, Stack, HStack, Grid, GridItem, RadioGroup, Radio, useFormControl } from '@chakra-ui/react';
import { StudentContributor, useStudentContributors } from './hooks/use-student-contributors';
import { isLoadingOrError } from '../../lib/hooks/utils';
import { BORDER_GRAY, COMPONENT_PADDING, DEFAULT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../components/styles.config';
import { getDistinctYears } from './utils/utils';
import { FieldValues, useController, UseControllerProps, useForm, useFormContext } from 'react-hook-form';

interface StudentContributorsProps {
	backgroundColor: "primary" | "secondary"
}

interface SelectYearFormValues {
	year: string
}

const StudentContributors = ({
	backgroundColor
}: StudentContributorsProps) => {
	const { data, ...loadingOrError } = useStudentContributors();

	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

	const years = useMemo(() => {
		const distinctYears = getDistinctYears(data);
		return distinctYears
	}, [data, loadingOrError])

	const defaultValues = {
		year: years.length ? years[0] : `${new Date().getFullYear() - 1}`
	}

	const {
		control,
		watch
	} = useForm<SelectYearFormValues>({
		defaultValues,
		mode: "onChange"
	})

	const watchYear = watch("year")

	if (isLoadingOrError(loadingOrError)) {
		return <div></div>
	}

	return (
		<Stack
			width="100%"
			backgroundColor={_backgroundColor}
			padding={COMPONENT_PADDING}
			alignItems="center"
		>
			<Stack
				width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
			>
				<Text fontSize="2xl" fontWeight="bold">Student Contributors</Text>
				<Text mb={4}>
					Each year we have been fortunate to have a dedicated group of student interns working with us,
					who are valued and equal partners in our research endeavors. The scope of the tasks they have worked on
					includes transcribing, editing, conducting historical research, and managing technical aspects of the project.
				</Text>
				<HStack
					bgColor={WHITE}
					padding={DEFAULT_PADDING}
					alignItems="start"
					p={4}
				>
					<StudentContributorTable students={data} year={watchYear} flex={3} />
					<StudentContributorTableControls
						control={control}
						name="year"
						years={years}
						flex={1}
					/>
				</HStack>
			</Stack>
		</Stack>
	);
};

interface StudentContributorTableProps {
	students: StudentContributor[];
	flex: number;
	year: string;
}
const StudentContributorTable: FC<StudentContributorTableProps> = ({
	students,
	flex,
	year
}) => {
	const filteredStudents = students.filter(student => student.year === year)
	console.log({
		filteredStudents,
		year
	})
	return (
		<Stack flex={flex}>
			<Grid flex={flex}>
				<GridItem textAlign="center" border={`1px solid ${BORDER_GRAY}`}>
					<Stack backgroundColor={PRIMARY_BG_COLOR}>
						<Text>Contributors</Text>
					</Stack>
				</GridItem>
				{filteredStudents.map(student => {
					return (
						<GridItem textAlign="center" border={`1px solid ${BORDER_GRAY}`}>
							<Text>{student.name}</Text>
						</GridItem>
					)
				})}
			</Grid>
		</Stack>
	)
}



interface StudentContributorTableControlProps<
	V extends FieldValues
> extends UseControllerProps<V> {
	years: string[];
	flex: number;
}

const StudentContributorTableControls = <V extends SelectYearFormValues>({
	years,
	flex,
	control,
	name,
	...rest
}: StudentContributorTableControlProps<V>) => {
	const {
		field: { onChange, value }
	} = useController({ name, control, ...rest });
	return (
		<Grid flex={flex} border={`1px solid ${BORDER_GRAY}`}>
			<GridItem textAlign="center" border={`1px solid ${BORDER_GRAY}`}>
				<Stack backgroundColor={PRIMARY_BG_COLOR}>
					<Text>Year</Text>
				</Stack>
			</GridItem>
			<RadioGroup
				onChange={onChange}
				value={value}
			>
				{years.map((year, index) => {
					return (
						<GridItem textAlign="center" border={`1px solid ${BORDER_GRAY}`}>
							<Radio value={year} isChecked={index === 0}>
								{year}
							</Radio>
						</GridItem>
					)
				})}
			</RadioGroup>
		</Grid>
	)
}

export default StudentContributors;
