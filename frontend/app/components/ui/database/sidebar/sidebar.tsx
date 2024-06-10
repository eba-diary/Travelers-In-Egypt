import { IconButton, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineClose } from "react-icons/ai"
import { Row } from "react-table";
import { CollapsibleSidebarContext } from "../../../../lib/hooks/context/use-collapsible-sidebar";

interface SideBarProps<TData extends object> extends CollapsibleSidebarContext {
  children: (
    data: TData
  ) => JSX.Element
}

export const Sidebar = <TData extends object>({ ...props }: SideBarProps<TData>) => {

  return (
    <Stack
      position="absolute"
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
          whiteSpace: "normal",
          position: "fixed",
          right: "0",
          height: "100vh",
          top: "0"
        }}
      >
        <IconButton
          aria-label="close"
          icon={<AiOutlineClose />}
          onClick={() => {
            props.setCurrentRow(null)
            props.setIsOpen(false)
          }}
        />
        <React.Fragment>
          {props.rowData && props.children(props.rowData as TData)}
        </React.Fragment>
      </motion.div>
    </Stack>
  )
}