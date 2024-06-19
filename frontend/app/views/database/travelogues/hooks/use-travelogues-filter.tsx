import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { NileTravelogue } from '../../../../components/ui/database/nile-travelogues-data-views';
import { CategoryFilter } from '../browse-by-category';

interface TraveloguesFilter {
	category?: CategoryFilter,
	term?: string
}

interface TraveloguesContextType {
	travelogues: NileTravelogue[];
	setTravelogues: Dispatch<SetStateAction<NileTravelogue[]>>;
	filter: TraveloguesFilter;
	setFilter: Dispatch<SetStateAction<TraveloguesFilter>>;
}

const TraveloguesContext = createContext<TraveloguesContextType | undefined>(undefined);

export const useTraveloguesFilter = () => {
	const context = useContext(TraveloguesContext);
	if (!context) {
		throw new Error('useTravelogues must be used within a TraveloguesProvider');
	}
	return context;
};

export const TraveloguesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [travelogues, setTravelogues] = useState<NileTravelogue[]>([]);
	/** replace any with useFieldArray stuff so we can add or remove filters in realtime */
	const [filter, setFilter] = useState<TraveloguesFilter>({
		term: "",
		category: {
			name: null,
			method: "none"
		}
	})
	return (
		<TraveloguesContext.Provider
			value={{
				travelogues,
				filter,
				setTravelogues,
				setFilter
			}}
		>
			{children}
		</TraveloguesContext.Provider>
	);
};