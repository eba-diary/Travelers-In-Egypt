import { useState, useMemo } from 'react';

export const usePagination = <T extends object>(data: T[], itemsPerPage: number) => {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(data.length / itemsPerPage);

	const paginatedData = useMemo(() => {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end);
	}, [data, currentPage, itemsPerPage]);

	const next = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
	};

	const prev = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const jump = (page: number) => {
		const pageNumber = Math.max(1, page);
		setCurrentPage(Math.min(pageNumber, maxPage));
	};

	return { next, prev, jump, paginatedData, currentPage, maxPage };
};