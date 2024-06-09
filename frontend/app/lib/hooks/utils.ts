import { UseQueryArgs } from "../../views/home/hooks/use-about-page";

interface isLoadingOrError {
	isLoading: boolean,
	isError: boolean
}
export const isLoadingOrError = (isLoadingOrError: isLoadingOrError): boolean => {
	return Object.values(isLoadingOrError).some(Boolean)
}