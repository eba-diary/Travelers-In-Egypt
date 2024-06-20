import { NileTravelogue, PublicationTraveler } from "../../../../components/ui/database/nile-travelogues-data-views"
import { Category } from "../browse-by-category"

export const findNextSortingStep = ({
	method
}: {
	method: "asc" | "desc" | "none"
}): "asc" | "desc" | "none" => {
	switch (method) {
		case "asc":
			return "desc"
		case "desc":
			return "none"
		case "none":
			return "asc"
		default:
			return "none"
	}
}

export const sortData = (data: NileTravelogue[], attribute: Category, method: "asc" | "desc" | "none") => {
	if (method === "none" || !attribute) return data;

	const key: keyof NileTravelogue = (() => {
		switch (attribute) {
			case "Title":
				return "title";
			case "Traveler":
				return "publication_traveler";
			default:
				return "title";
		}
	})();

	console.log({ data, key })

	return data.sort((a, b) => {
		const aValue = a[key];
		const bValue = b[key];
		// console.log({
		// 	aValue,
		// 	bValue,
		// 	key
		// })

		if (typeof aValue === "object" && typeof bValue === "object") {
			const aTraveler = getPrimaryAuthor(aValue as PublicationTraveler[]);
			const bTraveler = getPrimaryAuthor(bValue as PublicationTraveler[]);
			console.log({
				aTraveler,
				bTraveler
			})
			// if (aTraveler.traveler && bTraveler.traveler) {
			// 	const aTravelerName = aTraveler.traveler.traveler_name
			// 	const bTravelerName = bTraveler.traveler.traveler_name

			// 	if (method === "asc") {
			// 		return aTravelerName.localeCompare(bTravelerName);
			// 	} else {
			// 		return bTravelerName.localeCompare(aTravelerName);
			// 	}
			// }
		} else {
			if (typeof aValue === "string" && typeof bValue === "string") {
				if (method === "asc") {
					return aValue.localeCompare(bValue);
				} else {
					return bValue.localeCompare(aValue);
				}
			}
		}

		return 0;
	});
};

const getPrimaryAuthor = (authors: PublicationTraveler[]) => {
	return authors.find(author => author.traveler.traveler_type === "AUTHOR")
}
