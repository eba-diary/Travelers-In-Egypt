import { Stack } from "@chakra-ui/react";
import { TextImageSplit } from "../components/ui/text-image-split";
import FundingSupport from "../views/team/funding-and-support";
import StudentContributors from "../views/team/student-contributors";

export default function Team() {
	return (
		<Stack>
			<TextImageSplit
				heading="Team"
				text="Undergraduate student interns play an integral role in the process of transcription, encoding, historical research, data visualization and web/database development. Collaboration with faculty at the University of Washington led to the founding of  Newbook Digital Texts, an online publishing house offering a flourishing student internship program in digital humanities.  Students have developed  text markup and analysis tools that are openly available for research use. Our contributors and supporters are credited here."
				split="3/2"
				backgroundColor="primary"
			/>
			<TextImageSplit
				heading="Project Director"
				text="An Egyptologist and Digital Humanist, Sarah Ketchley brings life to stories of the past which are hidden in the archives.  She is particularly interested in the role lesser-known figures played in early Egyptian archaeology during the so-called ‘Golden Age’ at the end of the 19th and early 20th centuries. Her research and pedagogy focus on using digital tools to analyze and visualize humanities data, using archival material related to Near Eastern travel and archaeology as the basis for her work."
				split="3/2"
				backgroundColor="secondary"
				imagePlacement="start"
			/>
			<StudentContributors />
			<FundingSupport />
		</Stack>
	)
}