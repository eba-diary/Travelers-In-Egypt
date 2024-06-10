import { TextImageSplit } from "../../components/ui/text-image-split";
import { DatabaseSelect } from "../../views/database/database-selection";

export default function Database() {
	return (
		<div>
			<TextImageSplit
				heading="Explore Databases"
				text="Collections of primary source documents are presented as searchable databases. The documents provide a record of Nile travel, archaeology and society in Egypt, and include diary volumes, published travelogues and lists of passengers traveling on tour operator vessels. Search options include limiting by date, person, or publication, depending on the nature of the source material."
				split="3/2"
				backgroundColor="primary"
			/>
			<DatabaseSelect
				backgroundColor="secondary"
			/>
		</div>
	)
}