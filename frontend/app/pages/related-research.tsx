import { TextImageSplit } from "../components/ui/text-image-split";
import { RelatedResearchAccordion } from "../views/releated-research/releated-research-accordion";

export default function RelatedResearch() {
	return (
		<div>
			<TextImageSplit
				heading="Related Research"
				text="A showcase of research and pedagogical materials that use the project&apos;s primary sources as a starting point. Included here are projects built as interactive Story Maps, social network analysis and digital exhibits built by students in introductory digital humanities classes. There are links to our current work-in-progress&#58; a collection of diaries written by a Portland draughtsman, and newspaper reporting in The Times of London related to the discovery of King Tut&apos;s tomb in 1922."
				split="3/2"
				backgroundColor="primary"
			/>
			<RelatedResearchAccordion
				backgroundColor="secondary"
			/>
		</div>
	)
}