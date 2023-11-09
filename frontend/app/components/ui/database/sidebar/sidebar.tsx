import { IconButton, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineClose } from "react-icons/ai"
import { CollapsibleSidebarContext } from "../../../../lib/hooks/context/useCollapsibleSidebar";

interface SideBarProps<TData extends object> extends CollapsibleSidebarContext {
  children: (
    data: TData
  ) => JSX.Element
}

export const Sidebar = <TData extends object>({ ...props }: SideBarProps<TData>) => {
  return (
    <Stack
      position="fixed"
      top="0"
      bottom="0"
      right="0"
      zIndex={1}
    >
      <motion.div
        initial={false}
        animate={{ width: props.isOpen ? 650 : 0 }}
        style={{
          backgroundColor: "whitesmoke",
          borderLeft: "1px solid #BBB",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: "100vh",
          top: "0"
        }}
      >
        <Stack
          width="fit-content"
          padding="8px"
        >
          <IconButton
            aria-label="close"
            backgroundColor="ButtonFace"
            icon={<AiOutlineClose />}
            onClick={() => {
              props.setCurrentRow(null)
              props.setIsOpen(false)
            }}
          />
        </Stack>
        <React.Fragment>
          {props.rowData && props.children(props.rowData as TData)}
        </React.Fragment>
      </motion.div>
    </Stack>
  )
}