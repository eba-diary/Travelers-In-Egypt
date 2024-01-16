import { HStack } from "@chakra-ui/react"
import { CmsComponentBase, CmsStackProps } from "./types"



export const EditableHStack = ({ children, props }: CmsStackProps) => {
  return (
    <HStack
      {...props}
    >
      {children}
    </HStack>
  )
}