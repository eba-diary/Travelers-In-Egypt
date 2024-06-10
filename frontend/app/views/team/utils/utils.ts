import { StudentContributor } from "../hooks/use-student-contributors";

export const getDistinctYears = (contributors: StudentContributor[]) => {
	const years = contributors.map(contributor => contributor.year);
	const distinctYears = Array.from(new Set(years));
	return distinctYears.sort((a, b) => Number(b) - Number(a));
};