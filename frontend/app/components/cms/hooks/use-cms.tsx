import { ChakraProps } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query"
import { createContext, FC, PropsWithChildren } from "react";
import { CmsComponentBase } from "../types";

type CmsComponentType = "stack" | "hstack" | "button";

type CmsRawData<
  T extends CmsComponentType | null
> = T extends CmsComponentType ?
  {
    [key in T]: {
      props: ChakraProps,
      children: CmsRawData<CmsComponentType | null>
    }
  }
  : null

export const CmsContext = createContext<CmsRawData<CmsComponentType | null>>(null);

export const CmsContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const { data: cmsData, error } = useQuery<CmsRawData<CmsComponentType | null>>(["cms-data"], async () => {
    return null;
  });

  if (error) {
    throw new Error("Error getting Cms Data", {
      cause: error
    })
  }

  return (
    <CmsContext.Provider
      value={cmsData}
    >
      {children}
    </CmsContext.Provider>
  )
}

export const useCms = () => {
  const cmsData = useQuery<CmsRawData<CmsComponentType | null>>(["cms-data"], async () => {
    return null;
  });
}