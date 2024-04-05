import { HStack } from "@chakra-ui/react"
import { CmsStackProps } from "../types"




export const EditableHStack = ({ children, props }: CmsStackProps) => {
  return (
    <HStack
      {...props}
    >
      {children}
    </HStack>
  )
}