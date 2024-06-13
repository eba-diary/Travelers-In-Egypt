import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { NileTravelogue } from '../../../../components/ui/database/nile-travelogues-data-views';
import { Category } from '../browse-by-category';

interface TraveloguesFilter {
	category: Category,
	term: string
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
	const [filter, setFilter] = useState<TraveloguesFilter>()
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