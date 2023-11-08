import { IconButton, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai"
import { CollapsibleSidebarContext } from "../../../../lib/hooks/context/useCollapsibleSidebar";

interface SideBarProps extends CollapsibleSidebarContext { }

export const Sidebar = ({ ...props }: SideBarProps) => {

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
        animate={{ width: props.isOpen ? 500 : 0 }}
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
        <IconButton
          aria-label="close"
          icon={<AiOutlineClose />}
          onClick={() => {
            props.setCurrentRow(null)
            props.setIsOpen(false)
          }}
        />
        {JSON.stringify(props.rowData)}
      </motion.div>
    </Stack>
  )
}