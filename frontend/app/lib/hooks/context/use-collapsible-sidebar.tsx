import { createContext, FC, useContext, useState } from "react"

export interface CollapsibleSidebarContext {
  isOpen: boolean,
  setIsOpen: (data: boolean) => void,
  currentRow: string | null,
  setCurrentRow: (data: string | null) => void,
  rowData: object | null,
  setRowData: (data: object) => void
}

export const CollapsibleSidebarContext = createContext<CollapsibleSidebarContext>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error("Not implemented yet")
  },
  currentRow: null,
  setCurrentRow: () => {
    throw new Error("Not implemented yet")
  },
  rowData: null,
  setRowData: () => {
    throw new Error("Not implemented yet")
  }
});

export interface PropsWithChildren {
  children: React.ReactNode
}

export const CollapsibleSidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentRow, setCurrentRow] = useState<string | null>(null)
  const [rowData, setRowData] = useState<object | null>(null)

  return (
    <CollapsibleSidebarContext.Provider value={{
      isOpen,
      setIsOpen,
      currentRow,
      setCurrentRow,
      rowData,
      setRowData
    }}
    >
      {children}
    </CollapsibleSidebarContext.Provider>
  )
}

const useCollapsibleSidebar = (): CollapsibleSidebarContext => {
  const context = useContext(CollapsibleSidebarContext)
  return context
}

export default useCollapsibleSidebar