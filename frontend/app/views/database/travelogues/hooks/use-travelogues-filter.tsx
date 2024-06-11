import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { NileTravelogue } from '../../../../components/ui/database/nile-travelogues-data-views';


interface TraveloguesContextType {
	travelogues: NileTravelogue[];
	setTravelogues: Dispatch<SetStateAction<NileTravelogue[]>>;
	filter: any;
	setFilter: Dispatch<SetStateAction<any[]>>;
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
	const [filter, setFilter] = useState<any>([])
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